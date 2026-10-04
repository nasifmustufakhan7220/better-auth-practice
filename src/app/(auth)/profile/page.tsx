"use client"
import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { InputGroup } from "@heroui/react";
import React from "react";
import { changePassword, updateUser } from "@/lib/auth-client";
import { useState } from "react";

const ProfilePage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handelUpdateProfile = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>
        console.log(data.name);
        const {data:resData, error} = await updateUser({
            name: data.name,
        });
        console.log(resData,error);

        const currentPassword = data.currentPassword;
        const newPassword = data.newPassword;

        if(currentPassword || newPassword){
          if(!currentPassword || !newPassword){
            console.log("Please enter both passwords. ");
            return;
          }

          if(newPassword.length < 8){
            alert("Password must be at least 8 characters.");
            return;
          }
        }

        const { data: userPass, error:errorPass } = await changePassword({
          newPassword: data.newPassword,
          currentPassword: data.currentPassword,
          revokeOtherSessions: true,
        });

       console.log(userPass, errorPass);
    }

  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={handelUpdateProfile}>
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        <TextField className="w-full max-w-70" name="currentPassword">
          <Label>Current Password</Label>
          <InputGroup>
            <InputGroup.Input
              name="currentPassword"
              className="w-full max-w-70"
              type={isVisible ? "text" : "password"}
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-full max-w-70" name="newPassword">
          <Label>New Password</Label>
          <InputGroup>
            <InputGroup.Input
            name="newPassword"
              className="w-full max-w-70"
              type={isVisible ? "text" : "password"}
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
