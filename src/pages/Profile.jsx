import React, { useState } from "react";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { authAPI } from "../API/auth.api";
import { getAccessTokenFromLocalStorage } from "../API/localStorageApi";
import { upDateProfile } from "../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import postsAPI from "../API/posts.api";

function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth.userId);
  const navigate = useNavigate();
  const [img, setImg] = useState(auth.avatar);
  const [upLoadImg, setUpLoadImg] = useState();
  const imgChangeHandler = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      setImg(data.target.result);
    };
    setUpLoadImg(file);
  };
  const upDateNewProfile = async () => {
    try {
      const f = new FormData();
      f.append("avatar", upLoadImg);

      const newProfile = await authAPI.patch("/profile", f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            getAccessTokenFromLocalStorage().accessToken
          }`,
        },
      });
      console.log(newProfile);
      const updatePost = await postsAPI.patch(`/posts/test123456`, {
        avatar: newProfile.avatar,
      });
      console.log(updatePost);
      dispatch(upDateProfile(newProfile));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container>
        <ProfileBox>
          <ProfileTitle>Edit Profile</ProfileTitle>
          <label>
            <ProfileFigure>
              <img
                src={img ?? process.env.PUBLIC_URL + "img/avatar.jpg"}
                alt="아바타이미지"
              />
            </ProfileFigure>
            <input type="file" accept="image/*" onChange={imgChangeHandler} />
          </label>
          <ProfileNickname>{auth.nickname}</ProfileNickname>
          <ProfileUserId>{auth.userId}</ProfileUserId>
          <ProfileButton>
            <button onClick={upDateNewProfile}>Edit</button>
            {/* <button>Cancel</button>
            <button>Done</button> */}
          </ProfileButton>
        </ProfileBox>
      </Container>
    </div>
  );
}
const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileBox = styled.main`
  width: 600px;
  height: 400px;
  background-color: #fdb69f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 35px;
  & input {
    display: none;
  }
`;
const ProfileTitle = styled.h1`
  font-size: 36px;
  font-weight: bolder;
`;
const ProfileFigure = styled.div`
  & img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: white;
  }
`;
const ProfileNickname = styled.span`
  font-size: 24px;
  font-weight: bolder;
`;
const ProfileUserId = styled.span``;
const ProfileButton = styled.div`
  & button {
    border: 1px solid white;
    padding: 5px 15px;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default Profile;
