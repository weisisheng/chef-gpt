import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { getRecipePublic } from "@/lib/supabase-queries"
import { GeneratedRecipeContent } from "@/components/generated-recipe-content"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"

interface RecipePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const id = params.id
  const [recipe] = await Promise.all([getRecipePublic(id)])

  if (!recipe) {
    return {}
  }

  return {
    metadataBase: new URL("https://chef-genie.app"),
    title: recipe.title,
    description: recipe.description,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const id = params.id
  const [recipe] = await Promise.all([getRecipePublic(id)])

  if (!recipe) {
    notFound()
  }

  return (
    <div className="container grid">
      <PageHeader>
        <PageHeaderHeading>{recipe.title}</PageHeaderHeading>
      </PageHeader>
      <div className="mx-auto w-full max-w-3xl">
        <GeneratedRecipeContent recipe={recipe} />
      </div>
    </div>
  )
}