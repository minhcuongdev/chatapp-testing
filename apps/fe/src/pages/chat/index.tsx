import Conversasion from "./conversasion"
import LeftSide from "./left-side"

const Chat = () => {

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border flex  ">
      <LeftSide />
      <Conversasion />
    </div>
  )

}

export default Chat
