import Link from "next/link";
import { request, gql } from "graphql-request";

const gqlUrl =
  "https://api-eu-central-1.graphcms.com/v2/cl345fst15feb01z8812h7478/master";
const listQuery = gql`
  query GetPosts {
    posts {
      slug
    }
  }
`;

const postQuery = gql`
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      title
      content {
        html
      }
    }
  }
`;

export async function getServerSideProps({ params: { slug } }) {
  const data = await request(gqlUrl, postQuery, { slug });

  return {
    props: {
      post: data.post
    }
  };
}

export default function IndexPage({ post }) {
  console.log(post.content.html);
  return (
    <div>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
}
