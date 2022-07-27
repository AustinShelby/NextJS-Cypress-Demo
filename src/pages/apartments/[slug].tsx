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
> = ({ apartment }) => {
  return (
    <main>
      <h1>{apartment.name}</h1>
      <dl>
        <dt>Rooms:</dt>
        <dd>{apartment.rooms}</dd>
      </dl>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<
  {
    apartment: Apartment;
  },
  { slug: string }
> = async (context) => {
  const apartment = await prisma.apartment.findUnique({
    where: { slug: context.params?.slug },
  });

  if (!apartment) {
    return { notFound: true };
  }

  return { props: { apartment } };
};

export default ApartmentsPage;
