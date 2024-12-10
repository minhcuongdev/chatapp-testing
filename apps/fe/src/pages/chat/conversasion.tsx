const LeftConversasion = (
  { data }: {
    data: ConversasionType

  }
) => {
  return (
    <div className="flex flex-col items-start px-5 py-2">
      <div className="bg-gray-200 text-black p-2 rounded-lg">
        {data.message}
      </div>
      <div className="text-xs text-gray-400">
        {data.time}
      </div>
    </div>
  )
}

const RightConversasion = ({ data }: {
  data: ConversasionType

}) => {
  return (
    <div className="flex flex-col items-end px-5 py-2">
      <div className="bg-blue-500 text-white w-fit p-2 rounded-lg">
        {data.message}
      </div>
      <div className="text-xs text-gray-400">
        {data.time}
      </div>
    </div>
  )
}

const InputChat = () => {
  return (
    <>
      <input className="h-16 rounded-full border w-full px-5 outline-none" />
      <button>Send</button>
    </>
  )
}

type ConversasionType = {
  id: number,
  message: string,
  sender: string,
  time: string
}

const mockData: ConversasionType[] = [
  {
    id: 1,
    message: "Hello",
    sender: "user",
    time: "12:00"

  },
  {
    id: 2,
    message: "Hi",
    sender: "bot",
    time: "12:01"
  }
  ,
  {
    id: 3,
    message: "How are you",
    sender: "user",
    time: "12:02"
  }
  ,
  {
    id: 4,
    message: "I am fine",
    sender: "bot",
    time: "12:03"
  },
  {
    id: 5,
    message: "Good to hear",
    sender: "user",
    time: "12:04"
  },
  {
    id: 6,
    message: "Good to hear",
    sender: "bot",
    time: "12:05"
  },
  {
    id: 7,
    message: "Good to hear",
    sender: "user",
    time: "12:06"
  },
  {
    id: 8,
    message: "Good to hear",
    sender: "bot",
    time: "12:07"
  },
  {
    id: 9,
    message: "Good to hear",
    sender: "user",
    time: "12:08"
  },
  {
    id: 10,
    message: "Good to hear",
    sender: "user",
    time: "12:09"
  },
  {
    id: 11,
    message: "Good to hear",
    sender: "bot",
    time: "12:09"
  },
  {
    id: 12,
    message: "Good to hear",
    sender: "user",
    time: "12:10"
  },
  {
    id: 13,
    message: "Good to hear",
    sender: "user",
    time: "12:11"
  },
  {
    id: 14,
    message: "Good to hear",
    sender: "bot",
    time: "12:12"
  },
  {
    id: 15,
    message: "Good to hear",
    sender: "user",
    time: "12:13"
  },

]

const Conversasion = () => {
  return (
    <div className="w-full flex-1">
      <div className="border-b h-20 flex justify-end items-center  px-5">
        <div className="flex flex-row justify-end items-center gap-10 ">
          <p>Name</p>
          <span className="relative inline-block rounded-full w-16 h-16">
            <img className="rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <span className="w-4 h-4  bg-red-400 absolute top-0.5 right-0.5 rounded-full" />
          </span>
        </div>
      </div>
      <div className="flex flex-col-reverse overflow-y-auto h-[calc(100%-160px)] no-scrollbar">
        {mockData.map((item) => {
          if (item.sender === "user") {
            return (
              <RightConversasion data={item} />
            )
          } else {
            return (
              <LeftConversasion data={item} />
            )
          }
        }
        )}
      </div>
      <div className="h-20 border-t flex flex-row gap-2 items-center px-10">
        <InputChat />
      </div>
    </div>
  )
}
export default Conversasion
