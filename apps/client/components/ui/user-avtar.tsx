"use client"
import AvatarCircles from "./avtar-circle";

const avatarUrls = [
  {
    img: 'https://avatars.githubusercontent.com/u/8079861',
    hkirat: true
  },
  {
    img: 'https://avatars.githubusercontent.com/u/129197623'
  },
  {
    img: 'https://avatars.githubusercontent.com/u/99237795'
  },
  {
    img: 'https://avatars.githubusercontent.com/u/89733575'
  },
];

export function UsersAvatar() {
  return <AvatarCircles numPeople={100} avatarUrls={avatarUrls} />;
}