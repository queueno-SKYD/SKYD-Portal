import React, { useRef } from "react";
import ChatMessage from "../components/chatMessage";

const messagesList = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "John",
    lastName: "Doe",
    sendAt: "Thu, 11 Jan 2024 13:56:18 GMT",
    senderId: 23,
    message: "How are you?",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Alice",
    lastName: "Smith",
    sendAt: "Fri, 12 Jan 2024 08:20:42 GMT",
    senderId: 45,
    message:
      "I'm doing well, thank you! how about you? do you want to have some dinner with bob? he is smart guy",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1520697966256-358ab2b720f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Emily",
    lastName: "Johnson",
    sendAt: "Sat, 13 Jan 2024 15:30:05 GMT",
    senderId: 67,
    message: "Nice weather today!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Dheeraj",
    lastName: "Shrivastva",
    sendAt: "Sun, 14 Jan 2024 10:45:30 GMT",
    senderId: 25,
    message:
      "Hello everyone! Please let me know if you have any issue on chat app",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1486842575568-b63e9f8ea1e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Sophia",
    lastName: "Wilson",
    sendAt: "Mon, 15 Jan 2024 12:10:15 GMT",
    senderId: 1011,
    message: "Good morning!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512316806173-83cce75b4cc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Liam",
    lastName: "Martinez",
    sendAt: "Tue, 16 Jan 2024 09:55:20 GMT",
    senderId: 1213,
    message: "What's up?",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Dheeraj",
    lastName: "Shrivastva",
    sendAt: "Sun, 14 Jan 2024 10:45:30 GMT",
    senderId: 25,
    message: "I'm excited for the weekend!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1528901166006-7a93d63d2838?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Olivia",
    lastName: "Garcia",
    sendAt: "Wed, 17 Jan 2024 14:20:55 GMT",
    senderId: 1415,
    message: "Me to!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1524989188314-62ea5fee6b2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Ethan",
    lastName: "Rodriguez",
    sendAt: "Thu, 18 Jan 2024 11:35:40 GMT",
    senderId: 1617,
    message: "Let's catch up soon!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512626120414-a26aee18a8e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Ava",
    lastName: "Hernandez",
    sendAt: "Fri, 19 Jan 2024 08:45:25 GMT",
    senderId: 1819,
    message: "How was your day?",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519363814881-9f4b382ca005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww",
    firstName: "Dheeraj",
    lastName: "Shrivastva",
    sendAt: "Sun, 14 Jan 2024 10:45:30 GMT",
    senderId: 25,
    message: "fine",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1506405391164-9cf726a3e6c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Noah",
    lastName: "Lopez",
    sendAt: "Sat, 20 Jan 2024 16:30:50 GMT",
    senderId: 2021,
    message: "I'm looking forward to the party!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Isabella",
    lastName: "Young",
    sendAt: "Sun, 21 Jan 2024 09:10:35 GMT",
    senderId: 2223,
    message: "Happy Sunday!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1510936110437-01396c161fbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Mason",
    lastName: "Perez",
    sendAt: "Mon, 22 Jan 2024 12:40:20 GMT",
    senderId: 2425,
    message: "Have a great day!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512455105856-d1577b2ebfbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Charlotte",
    lastName: "Flores",
    sendAt: "Tue, 23 Jan 2024 14:55:15 GMT",
    senderId: 2627,
    message: "Looking forward to seeing you!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517577644210-67241a3dbec3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Landon",
    lastName: "Gonzalez",
    sendAt: "Wed, 24 Jan 2024 11:20:30 GMT",
    senderId: 2829,
    message: "Have a wonderful day ahead!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1535124644144-5953a4e9d786?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Lucas",
    lastName: "Martinez",
    sendAt: "Thu, 25 Jan 2024 09:45:10 GMT",
    senderId: 3031,
    message: "Let's meet up soon!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1537634111690-27c47bf4d79d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Harper",
    lastName: "Lee",
    sendAt: "Fri, 26 Jan 2024 13:10:25 GMT",
    senderId: 3233,
    message: "Have a fantastic weekend!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519178616873-39f10e56e057?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Evelyn",
    lastName: "Harris",
    sendAt: "Sat, 27 Jan 2024 10:25:40 GMT",
    senderId: 3435,
    message: "Enjoy your day!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1515769859881-3f9e000c43d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "Alexander",
    lastName: "Clark",
    sendAt: "Sun, 28 Jan 2024 09:30:55 GMT",
    senderId: 3637,
    message: "Sending positive vibes your way!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517058619449-e2a39e1b423d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNwbGFzaHxlbnwwfHwwfHx8",
    firstName: "William",
    lastName: "Walker",
    sendAt: "Mon, 29 Jan 2024 11:15:20 GMT",
    senderId: 3839,
    message: "Have a productive day!",
  },
];

const Test = () => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    console.debug("cdscdc", "clicked", messagesEndRef?.current)
    if (messagesEndRef?.current) {
      console.debug("sdssds")
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  return (
    <>
    <button onClick={scrollToBottom}>
      click to bottom
    </button>
    <div style={{overflowY: "auto"}}>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio recusandae aut aliquam, voluptatibus exercitationem architecto excepturi impedit. Eaque et debitis expedita facilis sint, enim maiores in, repudiandae, ipsa cum suscipit! Aut quaerat deleniti, necessitatibus velit voluptatibus aspernatur reprehenderit optio consectetur tempora recusandae. Repudiandae magni a veniam, laudantium itaque dignissimos aliquam! Eaque doloremque optio porro velit placeat, reprehenderit quae repellat. Aspernatur deserunt quo consectetur quisquam ducimus harum consequuntur numquam nemo assumenda voluptatem earum repudiandae odit dicta accusantium sit culpa illo aperiam ad quis, inventore vitae possimus repellendus placeat? Illum, nostrum culpa placeat quasi voluptatibus nihil cupiditate unde nesciunt, hic et, laborum ut enim temporibus voluptatum maxime? Corrupti atque quod tenetur ea, minus dolorem molestiae rem aliquid illum, sequi repudiandae nisi suscipit optio voluptas in. Expedita incidunt omnis earum commodi laborum ipsa quidem sequi fugiat voluptatibus nostrum. Facilis quod officiis debitis impedit quasi neque commodi rem obcaecati dicta nostrum ad porro excepturi, optio minus. Fuga earum animi nisi quos sequi eveniet, maiores numquam quibusdam dolores ipsa sed eos voluptate odit! Quam alias vel harum sunt dicta molestias, cumque, sint maiores numquam aspernatur ad, consequuntur sed ut quaerat saepe placeat beatae expedita odit ratione. Labore ducimus ut neque nostrum dolorem facere architecto deserunt, ullam nulla at minus nam velit quos quidem iusto eos sapiente omnis iure impedit odit odio id assumenda nisi? Eius, rerum ab autem, tempore voluptate pariatur cum nisi, minus sit in qui! Voluptatum, enim. Necessitatibus molestiae saepe excepturi neque sapiente! Aperiam odit magnam quas hic possimus nostrum, ab quisquam neque, vel similique harum laborum eaque aut debitis porro praesentium inventore ducimus esse ratione accusantium consequuntur blanditiis modi veritatis omnis. Veritatis consequuntur cupiditate ipsum voluptatem maxime perferendis facere. Perferendis, totam iure. Recusandae deserunt, blanditiis quam quae molestias a praesentium nemo consequatur ex nihil veritatis ullam optio asperiores illo aut animi eaque vitae fuga officiis quisquam cum quia perferendis earum quasi? Magni mollitia recusandae fugit minima fuga vero beatae nesciunt iusto voluptatem itaque, architecto tempore deleniti sed est cupiditate voluptas commodi aspernatur eaque saepe molestias excepturi quo? Voluptate, doloribus! Minus, laboriosam. Rerum dignissimos quisquam tempora incidunt explicabo cum possimus saepe est nisi aut excepturi assumenda animi, quaerat asperiores quidem rem inventore officiis delectus atque repellendus iure. Vero consequatur nulla qui nesciunt aliquam ut, quod et error ipsam facere doloremque, quaerat placeat fugiat sunt a provident dolor. Cum at excepturi culpa fuga incidunt nam tenetur? Mollitia rem repudiandae, doloribus necessitatibus officia ab assumenda fugiat eius et doloremque esse cumque cum nemo? Repellendus dolorem iure voluptatibus accusamus nulla fuga mollitia quas illum quos? Minima error necessitatibus praesentium amet magnam modi quis deleniti fuga eveniet dolor dignissimos blanditiis incidunt nisi expedita cumque asperiores dolorum perferendis, ullam consequuntur cum assumenda ea? Magni corrupti harum consequuntur illum ipsa nemo ea. Maiores numquam quod nisi a, modi voluptates odio ex quis distinctio sint iure repellat commodi quasi totam. Nulla nisi, doloremque nemo labore itaque quam neque aut quas assumenda, ipsam enim? Pariatur vitae corrupti velit aperiam tenetur commodi officiis, dolore cupiditate incidunt explicabo, doloremque eius ullam autem ad.</p> */}
      <div ref={messagesEndRef}>
      {messagesList?.length > 0 &&
        messagesList?.map((item, index) => {
          return (
            <ChatMessage
              key={index}
              message={item?.message}
              isMine={25 === item?.senderId}
              time={item?.sendAt}
              senderName={`${item?.firstName} ${item?.lastName}`}
              senderImage={item?.imageUrl}
              firstName={item?.firstName}
              lastName={item?.lastName}
            />
          );
        })}
      </div>
    </div>
    </>
  )
}

export default Test;
