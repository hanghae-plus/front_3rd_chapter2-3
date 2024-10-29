import React from 'react';
import { Plus } from "lucide-react"
import {
    Button,
  } from "../../../shared/ui"

interface AddPostButtonProps {
    onClick: () => void;
}


const AddPostButton: React.FC<AddPostButtonProps> = ({ onClick }) => {
    return (
      <Button onClick={onClick}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    );
  };

export default AddPostButton;