import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card/Card";
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { Badge } from "@/shared/ui/badge/Badge"; // Correct the import path if the module is located here
import { Button } from "@/shared/ui/button/Button";
import { Calendar, Tag, User } from "lucide-react";
import { Post } from "@/entities/post/model/types";
import { usePostStore } from "@/entities/post/model/store";
import { formatDate } from "@/shared/lib/format";

interface PostDetailsWidgetProps {
  post: Post;
}

export const PostDetailsWidget = ({ post }: PostDetailsWidgetProps) => {
  const { setSelectedPost } = usePostStore();

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSelectedPost(null)}
          >
            ✕
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
        <Avatar 
            src={post.author?.image} 
            alt={post.author?.username}
            size="lg" 
        />
          <div className="space-y-1">
            <p className="text-sm font-medium">{post.author?.username}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-1 h-4 w-4" />
            작성자: {post.author?.username}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            수정일: {formatDate(post.updatedAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};