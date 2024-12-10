const list = Array.from({ length: 10 }, (_, index) => {
  return {
    id: index,
    name: `Friend ${index}`,
  };
});
console.log(list)

const ListFriend = () => {
  return (
    <div className="flex flex-row overflow-x-auto no-scrollbar border-b">
      {list.map((friend) => {
        return (
          <div key={friend.id} className="flex items-center p-2 flex-col ">
            <span className="relative inline-block rounded-full w-14 h-14">
              <img className="rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <span className="w-4 h-4  bg-red-400 absolute top-0.5 right-0.5 rounded-full " />
            </span>
            <span className="ml-2 truncate text-ellipsis">{friend.name}</span>
          </div>
        )
      })}
    </div>
  )
}

const listRoom = Array.from({ length: 200 }, (_, index) => {
  return {
    id: index,
    name: `Room ${index}`,
  };
})

const ListRoom = () => {
  return (
    <div className="flex flex-col overflow-auto no-scrollbar h-[calc(100%-96px)]">
      {listRoom.map((room) => {
        return (
          <div key={room.id} className="flex p-2">
            <div>
              <span className="relative inline-block rounded-full w-14 h-14">
                <img className="rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <span className="w-4 h-4  bg-red-400 absolute top-0.5 right-0.5 rounded-full " />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="ml-2 truncate text-ellipsis">{room.name}</span>
              <span className="ml-2 truncate text-ellipsis">Messenger</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const LeftSide = () => {
  return (
    <div className="h-full border-r w-1/4 flex-none ">
      <ListFriend />
      <ListRoom />
    </div>
  )
}

export default LeftSide
