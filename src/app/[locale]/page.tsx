import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LocaleRootPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession();

  const { locale } = await params;

  if (!session) {
    redirect(`/${locale}/auth/login`);
  } else {
    redirect(`/${locale}/dashboard`);
  }
}
