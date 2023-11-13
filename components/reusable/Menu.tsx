"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/utils/userAuth";
import { auth } from "../../utils/firebaseConfig";
import { signOut } from "firebase/auth";

export function Menu() {
  const firebase = auth;
  const currentUser = useAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Redirect or update the state as needed
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {currentUser && (
  <>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Listings</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="p-4 md:w-[200px] lg:w-[250px] lg:grid-cols-[.75fr_1fr]">
          <ListItem href="/listing/create" title="Create listing listing">
            Create new apartment, room, or house listing to rent.
          </ListItem>
          <ListItem href="/docs/installation" title="Active listings">
            See your current and past public listings.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Account</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="p-4 md:w-[200px] lg:w-[250px] lg:grid-cols-[.90fr_1fr]">
          <ListItem href="/docs/primitives/typography" title="Past rents">
            History of rented objects.
          </ListItem>
          <ListItem
            className=" text-red-700"
            href="/"
            title="Logout"
            onClick={handleLogout}
          >Logout from {currentUser?.email}</ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </>
)}

{!currentUser && (
  <NavigationMenuItem>
    <Link href="/signup" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Sign up
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
)}

      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
