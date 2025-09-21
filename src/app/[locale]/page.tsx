import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LocaleRootPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession();

  const { locale } = params;

  if (!session) {
    redirect(`/${locale}/auth/login`);
  } else {
    redirect(`/${locale}/dashboard`);
  }
}
