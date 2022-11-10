# icebreaQ-client

This is the client implementation of icebreaQ. It is built with `React`, `socket.io`, `peerjs`, `WebRTC`.

## Environment
drwxr-xr-x  17 imhyeong-u  staff   544B 11 10 15:14 icebreaQ-front
- `react 18.2.0`

## Get Started

We assume this project is installed on ubuntu 16.04 or macOS.

### Before Download

You should install node v14.20.1

**WE RECOMMEND INSTALLING `node` VIA `nvm`**

1. [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm install 14`
3. `nvm use 14`

### Download and Configuration

1. download the git repo`sitory and install dependencies

```bash
git clone https://github.com/Team-ILA/icebreaQ-front.git
cd icebreaQ-front
npm install
```

2. set configuration for the client

```bash
cat .env.example > .env
```

**You should fill all the environment variables correctly in `.env` as described.**

### Running the Program

```bash
npm start
```

## Description

### Register

![Register Page](https://user-images.githubusercontent.com/80937237/201001351-c28634d4-fa4d-444c-a62a-350c2b07440e.png)
You can register as a user through this page.

- Your email address format should be valid.
- Your password should include at least one capital letter, one special character, and should be longer than 11 characters.

### Login

![Login Page](https://user-images.githubusercontent.com/80937237/201000899-13ca601d-04f5-403f-a60d-f47350f239b3.png)
You can login through this page.  
 **You need to be logged in to use enjoy all of the functionalities**

### Making quiz

![Making quiz](https://user-images.githubusercontent.com/24950961/201035960-6b7a45b2-1acb-432b-8c51-ff31695a0963.png)

You can create quiz through this page.

### Answer Page

![Answer Page](https://user-images.githubusercontent.com/24950961/201033161-a1ad1218-fd1c-40c9-bf48-53859e073396.png)

Users can communicate through chatting and video chat.
