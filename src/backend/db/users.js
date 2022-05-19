import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
    {
        _id: uuid(),
        firstName: "Adarsh",
        lastName: "Balika",
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        notes: [
            {
                heading: "Grocery List",
                body: "<p>- tomato</p><p>- apple</p><p>- onion</p><p>- potato</p>",
                tags: ["HOME"],
                priority: "low",
                color: "default",
                pinned: false,
                created: "Thu May 19 2022 00:45:48 ",
                _id: "1bf43ce9-0939-457d-9a34-e89bacc6b61a",
            },
            {
                heading: "TODO",
                body: "<p>- update laptop</p><p>- review PR</p><p>- push yesterdays changes</p>",
                tags: ["WORK"],
                priority: "low",
                color: "default",
                pinned: false,
                created: "Thu May 19 2022 00:47:09 ",
                _id: "e12c49ea-58af-4e68-be99-0227939cfebf",
            },
            {
                heading: "features to add",
                body: "<p>- profile page</p><p>- another login method</p><p>- dark mode</p>",
                tags: ["SIDE-PROJECT"],
                priority: "low",
                color: "default",
                pinned: false,
                created: "Thu May 19 2022 00:48:15 ",
                _id: "bfc24285-006e-4a57-adac-ba60d79803d4",
            },
            {
                heading: "image",
                body: '<p><img src="https://picsum.photos/1280/720" alt="random" width="300px"></p>',
                tags: ["RANDOM"],
                priority: "low",
                color: "default",
                pinned: false,
                created: "Thu May 19 2022 00:50:23 ",
                _id: "444f2317-a747-40ef-94ad-cb016f111a25",
            },
        ],
    },
];
