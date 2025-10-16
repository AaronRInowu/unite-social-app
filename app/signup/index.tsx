import PhoneNumberForm from "@/components/Forms/PhoneNumberForm";
import PageLayout from "@/components/layout/appBg";

export default function SignUpPage() {
 
  return (

    <PageLayout style={{ justifyContent: "space-between" }}>
        <PhoneNumberForm />
    </PageLayout>
  );
}
