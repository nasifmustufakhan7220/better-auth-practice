"use client"
import { resetPassword } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, InputGroup, Form ,Label, TextField, toast } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1 ] = useState(false);

  const searchParams  = useSearchParams();
  const token = searchParams .get("token");

  const handelResetPassword = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>

    const newPassword = userData.newPassword;
    const reNewpassword = userData.reNewpassword;

    if(!token){
        return;
    }

    if(newPassword !== reNewpassword){
        toast.danger("Doest not match password with reNewPassword!");
        return;
    }

    const resData = await resetPassword({
      newPassword: newPassword,
      token: token
    });

    console.log("after reset password", resData);
    toast.success("Password change successfully");
  }
  return (
    <Form className="flex w-96 flex-col gap-4" onSubmit={handelResetPassword}>
      <TextField className="w-full max-w-70" name="newPassword">
        <Label>New Password</Label>
        <InputGroup>
          <InputGroup.Input
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

      <TextField className="w-full max-w-70" name="reNewpassword">
        <Label>Re-Password</Label>
        <InputGroup>
          <InputGroup.Input
            className="w-full max-w-70"
            type={isVisible1 ? "text" : "password"}
          />
          <InputGroup.Suffix className="pe-0">
            <Button
              isIconOnly
              aria-label={isVisible1 ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible1(!isVisible1)}
            >
              {isVisible1 ? (
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
  );
};

export default ResetPasswordForm;
