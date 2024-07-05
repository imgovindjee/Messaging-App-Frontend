export const chatsSample = [
    {
        name: "Ganesh Jee",
        _id: "1",
        groupChat: false,
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        member: ['1', '2'],
    },
    {
        name: "Priyanka",
        _id: "2",
        groupChat: true,
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        member: ['1', '2'],
    }
]


export const sampleUsers = [
    {
        name: "Ganesh Jee",
        _id: "1",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    },
    {
        name: "Priyanka",
        _id: "2",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    }
]


export const sampleNotifications = [
    {
        sender: {
            name: "Ganesh Jee",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
        _id: "1",
    },
    {
        sender: {
            name: "Priyanka",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
        _id: "2",
    },
    {
        sender: {
            name: "Samishika",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
        _id: "3",
    }
]


export const sampleMessage = [
    {
        sender: {
            name: "Samishika",
            _id: "user._id",
        },
        _id: "jhgvgcjc",
        content: "What the Shit man...",
        chat: "chatId",
        attachments: [
            {
                url: "https://www.w3schools.com/howto/img_avatar.png",
                public_id: "khhj",
            },
        ],
        createdAt: "Sat Jun 22 2024 15:30:20 GMT+0530",
    },
    {
        sender: {
            name: "Sam",
            _id: "jhvsj",
        },
        _id: "jhgvgcjc",
        content: "Great Text",
        chat: "chatId",
        // attachments: [
        //     {
        //         url: "https://www.w3schools.com/howto/img_avatar.png",
        //         public_id: "khhj2",
        //     },
        // ],
        createdAt: "Sat Jun 22 2024 16:30:20 GMT+0530",
    }
]


export const dashBoardData = {
    users: [
        {
            name: "Ganesh Jee",
            _id: "1",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            username: "ganesh",
            friends: 20,
            groups: 5,
        },
        {
            name: "Priyanka",
            _id: "2",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            username: "priyanka",
            friends: 10,
            groups: 2,
        },
    ],
    chats: [
        {
            name: "Ganesh Jee",
            _id: "1",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png",],
            members: [
                {
                    _id: '1',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                {
                    _id: '2',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            totalMembers: 2,
            totalMessages: 100,
            groupChat: false,
            creator: {
                name: "Samishika",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        },
        {
            name: "Priyanka",
            _id: "2",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png",],
            members: [
                {
                    _id: '1',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                {
                    _id: '2',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            totalMembers: 2,
            totalMessages: 140,
            groupChat: true,
            creator: {
                name: "Samishika",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        }
    ],
    messages: [
        {
            attachments: [],
            content: "qwert asdfgh",
            _id: "2345tggvhkbn",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Anushka",
            },
            chat: "chatId",
            createdAt: "2024-05-12T10:41:30.6502"
        },
        {
            attachments: [
                {
                    public_id: "kbqshgx",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                },
            ],
            content: "qwert asdfgh",
            _id: "1234",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "chatinya",
            },
            chat: "chatId",
            createdAt: "2024-05-12T10:41:30.6502"
        },
    ]
}
