import { AppProviders } from "@/app/providers";
import PostsManager from "@/pages/post-manager/ui/PostsManagerPage";
import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { TEST_COMMENTS, TEST_POSTS, TEST_SEARCH_POST, TEST_USERS } from "./mockData";
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

  http.get("/api/comments/post/1", () => {
    return HttpResponse.json(TEST_COMMENTS);
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

  // 다른 테스트 케이스들. 참고용으로 작성된 것이며, 실제로는 작성하지 않았습니다.
  it("태그 필터링이 올바르게 작동해야 합니다", async () => {});
  it("정렬 기능이 올바르게 작동해야 합니다");
  it("페이지네이션이 올바르게 작동해야 합니다", async () => {
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

    const nextButton = screen.getByRole("button", { name: /다음/i });
    await user.click(nextButton);

    //TODO: next 페이지 테스트

    const previousButton = screen.getByRole("button", { name: /이전/i });
    await user.click(previousButton);

    //TODO: previous 페이지 테스트
  });
  it("게시물 상세 보기 대화상자가 올바르게 열리고 내용을 표시해야 합니다", async () => {
    const postIndex = 0;
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

    // 게시물 상세 보기 대화상자 열기
    const openButton = screen.getAllByTestId("open-post-detail");
    await user.click(openButton[postIndex]);

    // 게시물 내용 확인
    const bodyText = screen.queryAllByText(TEST_POSTS.posts[postIndex].body);
    expect(bodyText[postIndex]).toBeDefined();

    // 게시물 상세 보기 대화상자 닫기
    const closeButton = screen.getByRole("button", { name: /닫기/i });
    await user.click(closeButton);
  });
  it("댓글 추가 기능이 올바르게 작동해야 합니다", async () => {
    const postIndex = 0;
    const NEW_COMMENT = {
      userId: TEST_USERS.users[0].id,
      body: "This is a new comment",
      postId: TEST_POSTS.posts[postIndex].id,
    };
    const user = userEvent.setup();

    // POST 요청에 대한 핸들러 추가
    server.use(
      http.post("/api/comments/add", async ({ request }) => {
        const body = await request.json();
        // 요청 body 검증 (선택적)
        expect(body).toMatchObject({
          body: NEW_COMMENT.body,
          postId: NEW_COMMENT.postId,
          userId: NEW_COMMENT.userId,
        });
        return HttpResponse.json({ ...NEW_COMMENT, user: TEST_USERS.users[0] });
      }),
    );

    renderPostsManager();

    // 로딩 상태 확인 (선택적)
    expect(screen.getByText(/로딩 중.../i)).toBeInTheDocument();

    // 게시물이 로드되었는지 확인
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    // 게시물 상세 보기 대화상자 열기
    const openButton = screen.getAllByTestId("open-post-detail");
    await user.click(openButton[postIndex]);

    // 게시물 내용 확인
    const bodyText = screen.queryAllByText(TEST_POSTS.posts[postIndex].body);
    expect(bodyText[postIndex]).toBeDefined();

    // 댓글 추가 버튼 클릭
    const addCommentButton = screen.getByRole("button", { name: /댓글 추가/i });
    await user.click(addCommentButton);

    // 댓글 입력 확인
    const commentInput = screen.getByPlaceholderText(/댓글 내용/i);
    await user.type(commentInput, NEW_COMMENT.body);

    // 댓글 추가 버튼 클릭
    const submitButton = screen.getByRole("button", { name: /댓글 추가/i });
    await user.click(submitButton);

    // 댓글 추가 확인
    await waitFor(() => {
      expect(screen.getByText(NEW_COMMENT.body)).toBeInTheDocument();
    });

    // 게시물 상세 보기 대화상자 닫기
    const closeButton = screen.getByRole("button", { name: /닫기/i });
    await user.click(closeButton);
  });
  it("댓글 수정 기능이 올바르게 작동해야 합니다", async () => {
    const postIndex = 0;
    const EDIT_COMMENT = {
      userId: TEST_USERS.users[0].id,
      body: "This is a edited comment",
      postId: TEST_POSTS.posts[postIndex].id,
    };
    const user = userEvent.setup();

    // POST 요청에 대한 핸들러 추가
    server.use(
      http.put(`/api/comments/${TEST_COMMENTS.comments[0].id}`, async ({ request }) => {
        const body = await request.json();
        // 요청 body 검증 (선택적)
        expect(body).toMatchObject({
          body: EDIT_COMMENT.body,
        });
        return HttpResponse.json({ ...EDIT_COMMENT, user: TEST_USERS.users[0] });
      }),
    );

    renderPostsManager();

    // 로딩 상태 확인 (선택적)
    expect(screen.getByText(/로딩 중.../i)).toBeInTheDocument();

    // 게시물이 로드되었는지 확인
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    // 게시물 상세 보기 대화상자 열기
    const openButton = screen.getAllByTestId("open-post-detail");
    await user.click(openButton[postIndex]);

    // 게시물 내용 확인
    const bodyText = screen.queryAllByText(TEST_POSTS.posts[postIndex].body);
    expect(bodyText[postIndex]).toBeDefined();

    // 댓글 수정 버튼 클릭
    const editButton = screen.getAllByTestId("edit-comment-button");
    await user.click(editButton[0]);

    // 댓글에 기본 값이 표기되어 있는지?
    const input = screen.getByDisplayValue(TEST_COMMENTS.comments[0].body);

    // 댓글 내용 수정
    act(async () => {
      await user.clear(input);
    });
    await user.type(input, EDIT_COMMENT.body);

    // 댓글 업데이트 버튼 클릭
    const submitButton = screen.getByRole("button", { name: /댓글 업데이트/i });
    await user.click(submitButton);

    // 댓글 업데이트 확인
    await waitFor(() => {
      expect(screen.getByText(EDIT_COMMENT.body)).toBeInTheDocument();
    });

    // 게시물 상세 보기 대화상자 닫기
    const closeButton = screen.getByRole("button", { name: /닫기/i });
    await user.click(closeButton);
  });
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
