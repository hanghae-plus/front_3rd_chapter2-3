import { AppProviders } from "@/app/providers";
import PostsManager from "@/pages/post-manager/ui/PostsManagerPage";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { TEST_POSTS, TEST_SEARCH_POST, TEST_USERS } from "./mockData";

// MSW 서버 설정
const server = setupServer(
  http.get("/api/posts", () => {
    return HttpResponse.json(TEST_POSTS);
  }),

  http.get("/api/posts/search?q=His%20mother%20had%20always%20taught%20him", () => {
    return HttpResponse.json(TEST_SEARCH_POST);
  }),

  http.get("/api/users", () => {
    return HttpResponse.json(TEST_USERS);
  }),

  http.get("/api/posts/tags", () => {
    return HttpResponse.json([
      "history",
      "american",
      "crime",
      "french",
      "fiction",
      "english",
      "magical",
      "mystery",
      "love",
      "classic",
    ]);
  }),

  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const tags = url.searchParams.get("tags");

    if (tags === "history") {
      return HttpResponse.json({
        posts: TEST_POSTS.posts.filter((post) => post.tags.includes("history")),
        total: TEST_POSTS.posts.filter((post) => post.tags.includes("history")).length,
      });
    }
    return HttpResponse.json(TEST_POSTS);
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 테스트에 공통으로 사용될 render 함수
const renderPostsManager = () => {
  return render(
    <AppProviders>
      <MemoryRouter>
        <PostsManager />
      </MemoryRouter>
    </AppProviders>,
  );
};

describe("PostsManager", () => {
  it("게시물을 렌더링하고 검색을 허용합니다", async () => {
    const user = userEvent.setup();
    renderPostsManager();

    // 로딩 상태 확인 (선택적)
    expect(screen.getByText(/로딩 중.../i)).toBeInTheDocument();

    // 게시물이 로드되었는지 확인
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    // 검색 기능 테스트
    const searchInput = screen.getByPlaceholderText(/게시물 검색.../i);
    await user.type(searchInput, "His mother had always taught him");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByText("His mother had always taught him")).toBeInTheDocument();
      expect(screen.queryByText("He was an expert but not in a discipline")).not.toBeInTheDocument();
    });
  });

  it("새 게시물 추가를 허용합니다", async () => {
    const user = userEvent.setup();
    const NEW_POST = {
      id: TEST_POSTS.posts.length + 1,
      title: "New Post",
      body: "This is a new post",
      userId: 1,
      tags: [],
    };

    // POST 요청에 대한 핸들러 추가
    server.use(
      http.post("/api/posts/add", async ({ request }) => {
        const body = await request.json();
        // 요청 body 검증 (선택적)
        expect(body).toMatchObject({
          title: NEW_POST.title,
          body: NEW_POST.body,
        });
        return HttpResponse.json(NEW_POST);
      }),
    );

    renderPostsManager();

    // 기존 게시물들이 로드될 때까지 대기
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    const addButton = screen.getByRole("button", { name: /게시물 추가/i });
    await user.click(addButton);

    const titleInput = screen.getByPlaceholderText(/제목/i);
    const bodyInput = screen.getByPlaceholderText(/내용/i);
    await user.type(titleInput, NEW_POST.title);
    await user.type(bodyInput, NEW_POST.body);

    const submitButton = screen.getByRole("button", { name: /게시물 추가/i });
    await user.click(submitButton);

    // 새 게시물이 추가되었는지 확인
    await waitFor(() => {
      expect(screen.getByText(NEW_POST.title)).toBeInTheDocument();
    });
  });

  it("태그 필터링이 올바르게 작동해야 합니다", async () => {
    const user = userEvent.setup();
    renderPostsManager();

    // 셀렉트 박스 클릭
    const selectBox = screen.getByRole("button", { name: /태그 선택/i });
    await user.click(selectBox);

    // 초기 게시물들이 로드될 때까지 대기
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    // 태그 선택 버튼 클릭
    const historyTagButton = screen.getByRole("button", { name: /history/i });
    await user.click(historyTagButton);

    // history 태그가 있는 게시물만 표시되는지 확인
    await waitFor(() => {
      // history 태그가 있는 게시물은 표시되어야 함
      TEST_POSTS.posts
        .filter((post) => post.tags.includes("history"))
        .forEach((post) => {
          expect(screen.getByText(post.title)).toBeInTheDocument();
        });

      // history 태그가 없는 게시물은 화면에 없어야 함
      TEST_POSTS.posts
        .filter((post) => !post.tags.includes("history"))
        .forEach((post) => {
          expect(screen.queryByText(post.title)).not.toBeInTheDocument();
        });
    });

    // 선택된 태그가 시각적으로 표시되는지 확인
    expect(historyTagButton).toHaveClass("selected"); // 실제 클래스명에 맞게 수정 필요

    // 태그 필터 해제
    await user.click(historyTagButton);

    // 모든 게시물이 다시 표시되는지 확인
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });
  });

  // 다른 테스트 케이스들. 참고용으로 작성된 것이며, 실제로는 작성하지 않았습니다.
  it("정렬 기능이 올바르게 작동해야 합니다");
  it("페이지네이션이 올바르게 작동해야 합니다");
  it("게시물 상세 보기 대화상자가 올바르게 열리고 내용을 표시해야 합니다");
  it("댓글 추가 기능이 올바르게 작동해야 합니다");
  it("댓글 수정 기능이 올바르게 작동해야 합니다");
  it("댓글 삭제 기능이 올바르게 작동해야 합니다");
  it("댓글 좋아요 기능이 올바르게 작동해야 합니다");
  it("사용자 모달이 올바르게 열리고 사용자 정보를 표시해야 합니다");
  it("게시물 수정 기능이 올바르게 작동해야 합니다");
  it("게시물 삭제 기능이 올바르게 작동해야 합니다");
  it("검색 결과에서 하이라이트 기능이 올바르게 작동해야 합니다");
  it("URL 파라미터 변경에 따라 컴포넌트 상태가 올바르게 업데이트되어야 합니다");
  it("에러 상황에서 적절한 에러 메시지를 표시해야 합니다");
  it("로딩 상태일 때 로딩 인디케이터를 표시해야 합니다");
});
