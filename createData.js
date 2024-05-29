const baseUrl = "https://api.joinus.asia/";

const categories = [
  "영화",
  "스포츠",
  "음악",
  "게임",
  "책",
  "요리",
  "IT",
  "기타",
  "운동",
];

const api = [
  {
    url: "auth/signup",
    method: "POST",
    params: {
      password: "12341234!@",
      name: "승휘",
      profile:
        "https://kr.object.ncloudstorage.com/joinus/image/1711678253222.jpg",
      birth: "1996-01-05",
      sex: true,
      phone: "01041351531",
      email: "ush0105@aaa.com",
    },
  },
  {
    url: "auth/signin",
    method: "POST",
    params: {
      email: "ush0105@aaa.com",
      password: "12341234!@",
    },
  },
  {
    url: "categories",
    method: "POST",
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [9],
      description: "함께 운동하실 분들을 모집합니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: `Venus Health`,
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1713330560054.jpg",
          type: "main",
        },
      ],
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [4],
      description: "다양한 게임을 함께 즐기고 전략을 공유하는 모임입니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: "Gamer's Hub",
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1716989995310.jpg",
          type: "main",
        },
      ],
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [2],
      description:
        "다양한 스포츠 활동에 함께 참여할 열정적인 분들을 기다립니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: "Active Sports Community",
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1716990031823.jpg",
          type: "main",
        },
      ],
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [1],
      description:
        "영화 감상을 좋아하는 사람들과 함께 모여서 최신 영화를 즐겨봐요.",
      maximum_age: 100,
      minimum_age: 0,
      name: "Cinema Lovers Club",
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1716990056396.jpg",
          type: "main",
        },
      ],
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [6],
      description: "새로운 요리법을 함께 배우고 즐기는 요리 동호회입니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: "Culinary Enthusiasts",
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1716990074277.jpg",
          type: "main",
        },
      ],
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [3],
      description: "다양한 음악 장르를 함께 듣고 연주하는 모임입니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: "Harmony Music Group",
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1716990094885.jpg",
          type: "main",
        },
      ],
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [5],
      description: "다양한 책을 함께 읽고 토론하는 독서 모임입니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: "Bookworm Society",
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1716990113059.jpg",
          type: "main",
        },
      ],
    },
  },
];

const postCategory = async (header) => {
  const promises = categories.map(async (curr) => {
    await fetch(baseUrl + "categories", {
      method: "POST",
      headers: header,
      body: JSON.stringify({ name: curr }),
    });
    console.log("api Request:", "POST", baseUrl + "categories", curr);
  });
  await Promise.all(promises);
};

export const createData = async () => {
  const header = {
    "Content-Type": "application/json",
    Authorization: "",
  };

  for (const curr of api) {
    if (curr.url === "categories") {
      await postCategory(header);
    } else if (curr.url === "auth/signin") {
      const response = await fetch(baseUrl + curr.url, {
        method: curr.method,
        headers: header,
        body: JSON.stringify(curr.params),
      });
      const data = await response.json();
      const token = data.data.token;
      header.Authorization = token;
    } else {
      await fetch(baseUrl + curr.url, {
        method: curr.method,
        headers: header,
        body: JSON.stringify(curr.params),
      });
    }
  }
};
