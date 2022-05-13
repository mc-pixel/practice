import Link from "next/link";
import { request, gql } from "graphql-request";

const gqlUrl =
  "https://api-eu-central-1.graphcms.com/v2/cl345fst15feb01z8812h7478/master";
const query = gql`
post(where: {id: "cl345rduwbivf0brusy803xly"}) {
  assets {
    fileName
    height
    handle
  }
}
`;

export async function getServerSideProps() {
  const data = await request(gqlUrl, query);

  return {
    props: {
      post: data.post
    }
  };
}

export default function IndexPage({ post }) {
  return (
    <div>
      {//post.map((post) => (
        <div>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.fileName}</a>
          </Link>
          <p>{post.height}</p>
        </div>
      //))}
      }</div>
  );
}