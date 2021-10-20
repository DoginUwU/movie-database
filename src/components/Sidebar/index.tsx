import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Item } from "./styles";

interface LinkItemProps {
  defaultActive?: boolean;
  href: string;
  query: any;
  label: string;
}

const LinkItem = ({ href, label, query, defaultActive }: LinkItemProps) => {
  const router = useRouter();
  const activeDefault = defaultActive && router.query.type === undefined;
  const isActive = router.pathname === href && router.query.type === query.type;

  return (
    <Link
      href={{
        pathname: href,
        query: query,
      }}
      passHref
    >
      <Item active={isActive || activeDefault}>{label}</Item>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <Container>
      <h1>Movies Database</h1>
      <div>
        <LinkItem
          href="/"
          label="Now playing"
          query={{ type: "now_playing" }}
          defaultActive
        />
        <LinkItem href="/" label="Popular" query={{ type: "popular" }} />
        <LinkItem href="/" label="Top rated" query={{ type: "top_rated" }} />
        <LinkItem href="/" label="Upcoming" query={{ type: "upcoming" }} />
      </div>
    </Container>
  );
};

export default Sidebar;
