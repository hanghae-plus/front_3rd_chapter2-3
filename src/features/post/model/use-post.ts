import { atom, useAtom } from "jotai";
import { PostType } from "../../../entities/post";

// const postAtom = atom<PostType[]>([]);
const selectedPostAtom = atom<PostType | null>(null);
const showPostDetailDialogAtom = atom<boolean>(false);
const showAddDialogAtom = atom<boolean>(false);
const showEditDialogAtom = atom<boolean>(false);
// const listAtom = atom<unknown[]>([]);
const totalAtom = atom<number>(0);
const skipAtom = atom<number>(0);
const limitAtom = atom<number>(10);

export const usePost = () => {
  // const [postList, setPostList] = useAtom(postAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [showPostDetailDialog, setShowPostDetailDialog] =
    useAtom<boolean>(showPostDetailDialogAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  // const [list, setList] = useAtom<unknown[]>([]);
  const [total, setTotal] = useAtom(totalAtom);
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);

  return new (class {
    // postList = postList;
    selectedPost = selectedPost;
    showPostDetailDialog = showPostDetailDialog;
    showAddDialog = showAddDialog;
    showEditDialog = showEditDialog;
    // setPostList = setPostList;
    setSelectedPost = setSelectedPost;
    setShowPostDetailDialog = setShowPostDetailDialog;
    setShowAddDialog = setShowAddDialog;
    setShowEditDialog = setShowEditDialog;
    // list = list;
    total = total;
    skip = skip;
    limit = limit;
    // setList = setList;
    setTotal = setTotal;
    setSkip = setSkip;
    setLimit = setLimit;
  })();
};
