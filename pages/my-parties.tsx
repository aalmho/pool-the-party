import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Row } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { Party } from "../types";

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx, supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("parties")
      .select("name, id, party_id, images(image_url, image_text, created_at)")
      .eq("user_id", user?.id);

    const parties: Party[] = await JSON.parse(JSON.stringify(data));

    return { props: { parties, userName: user } };
  },
});

interface MyPartiesPageProps {
  parties: Party[];
  user: User;
}

const MyPartiesPage: NextPage<MyPartiesPageProps> = ({ parties, user }) => {
  const partiesRow = parties.map((party: Party) => (
    <Row key={party.name} justify="center">
      <Link href={`/party/${party.party_id}`}>{party.name}</Link>
    </Row>
  ));
  return (
    <div>
      <Row justify="center">Welcome {user.user_metadata.name}</Row>
      <Row justify="center">Your parties</Row>
      {partiesRow}
    </div>
  );
};

export default MyPartiesPage;
