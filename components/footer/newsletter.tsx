'use client'
import { useActionState } from "react"
import { subscribeToNewsletter } from "@/actions/newsletter"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Form from "next/form"
import { Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


function Newsletter() {
    const [state, formAction, isPending] = useActionState(subscribeToNewsletter, { success: false })
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-md text-gray-50 mb-4">
                Recevez les dernières actualités et les nouvelles du ministère des Finances.
            </p>
            <Form action={formAction} className="flex">
                <Input type="email" name="email" placeholder="Veuillez saisir votre email" className="flex-4 py-2 px-4 h-12 rounded-none placeholder:text-gray-50" />
                <Button className="flex-1 bg-yellow text-primary py-2 hover:bg-white hover:text-primary transition-all duration-300 ease-in-out placeholder:text-white" type="submit" disabled={isPending}>{isPending ? "S'abonner..." : <Send className="w-4 h-4" />}</Button>
            </Form>
            {state?.success && (
                <Alert>
                    <AlertTitle className="text-green-500">Succès</AlertTitle>
                    <AlertDescription className="text-green-500">Vous êtes abonné à la newsletter.</AlertDescription>
                </Alert>
            )}
            {state?.error && (
                <Alert variant="destructive">
                    <AlertTitle className="text-red-500">Erreur</AlertTitle>
                    <AlertDescription className="text-red-500">{state.error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}

export default Newsletter