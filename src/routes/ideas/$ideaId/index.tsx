import type { Idea } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

const fetchIdea = async (ideaId: String): Promise<Idea> => {
  const res = await fetch(`/api/ideas/${ideaId}`);

  if (!res.ok) {
    throw new Error("Idea not found");
  }
  return res.json();
};

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ["idea", ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute("/ideas/$ideaId/")({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  return (
    <div className="p-4">
      <Link to={`/ideas`} className="text-blue-500 hover:underline block mb-4">
        Back To Ideas
      </Link>
      <h2 className="text-2xl font-bold mb-2">{idea?.title}</h2>
      <p className="mt-2">{idea?.description}</p>
    </div>
  );
}
