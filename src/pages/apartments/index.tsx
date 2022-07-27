import { Apartment } from "@prisma/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../../utils/client";
import Link from "next/link";

const ApartmentsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ apartments }) => {
  return (
    <main>
      <h1>Apartments</h1>
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>
            <Link href={`/apartments/${apartment.slug}`}>
              <a>{apartment.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<{
  apartments: Apartment[];
}> = async (context) => {
  const apartments = await prisma.apartment.findMany();
  return { props: { apartments } };
};

export default ApartmentsPage;
