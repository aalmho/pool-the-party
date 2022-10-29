import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Authentication from "../components/Authentication";
import { Button } from "antd";
import MenuHeader from "../components/MenuHeader";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Authentication supabaseClient={supabaseClient}>
        <MenuHeader supabaseClient={supabaseClient} />
        <Component {...pageProps} />
      </Authentication>
    </SessionContextProvider>
  );
}

export default MyApp;
