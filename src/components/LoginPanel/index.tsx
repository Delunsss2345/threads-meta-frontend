import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LoginCard() {
  return (
    <div className=" flex justify-center items-center ">
      <Card className="w-[320px] text-center border border-gray-200 shadow-sm overflow-hidden rounded-2xl">
        <CardContent className="flex flex-col items-center p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              Log in or sign up for Threads
            </h2>
            <p className="text-sm text-gray-500">
              See what people are talking about and join the conversation.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border rounded-lg py-5 font-medium"
          >
            <Instagram className="w-5 h-5" />
            <span>Continue with Instagram</span>
          </Button>

          <NavLink
            to={"/login"}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            Log in with username instead
          </NavLink>
        </CardContent>
      </Card>
    </div>
  );
}
