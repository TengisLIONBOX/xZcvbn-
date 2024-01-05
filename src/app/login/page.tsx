import { Button } from "zenly/components/Button";

export default function LoginPage() {
  return (
    <section className="flex w-full h-screen items-center justify-center flex-col">
      <h2 className="uppercase font-bold text-4xl mb-6">Тавтай морил</h2>
      <Button as={"a"} href="/api/auth/login">
        Нэвтрэх
      </Button>
    </section>
  );
}
