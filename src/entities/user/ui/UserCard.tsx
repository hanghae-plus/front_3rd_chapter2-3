import { FC } from 'react'
import { User } from '@entities/comment/model/types'

interface UserCardProps {
  user: User | null
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    user && (
      <>
        <img src={user?.image} alt={user?.username} className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="text-xl font-semibold text-center">{user?.username}</h3>
        <div className="space-y-2">
          <p>
            <strong>이름:</strong> {user?.firstName} {user?.lastName}
          </p>
          <p>
            <strong>나이:</strong> {user?.age}
          </p>
          <p>
            <strong>이메일:</strong> {user?.email}
          </p>
          <p>
            <strong>전화번호:</strong> {user?.phone}
          </p>
          <p>
            <strong>주소:</strong> {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
          </p>
          <p>
            <strong>직장:</strong> {user?.company?.name} - {user?.company?.title}
          </p>
        </div>
      </>
    )
  )
}
