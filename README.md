# icebreaQ-client

This is the client implementation of icebreaQ. It is built with `React`, `socket.io`, `

## Environment

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

1. download the git repository and install dependencies

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
You can resgiter as a user through this page.

- Your email address format should be valid.
- Your password should include at least one capital letter, one special character, and should be longer than 11 characters.

### Login

![Login Page](https://user-images.githubusercontent.com/80937237/201000899-13ca601d-04f5-403f-a60d-f47350f239b3.png)
You can login through this page.  
 **You have to login first if you want to use our service.**

### Making quiz

![Making quiz](https://user-images.githubusercontent.com/80937237/201002353-d2d79eb5-b905-469e-8e9d-41a5e1cff82c.png)

You can create quiz through this page.

### Answer Page

![Answer Page](https://user-images.githubusercontent.com/80937237/201003649-bac3b659-3199-4e8a-97cc-acaac822f917.png)

Users can communicate through chatting and video chat.
