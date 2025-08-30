import api from "@/lib/axios";
import type { Idea } from "@/types";

export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get(`/ideas`);
  return res.data;
};

export const fetchIdea = async (ideaId: String): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return res.data;
};

export const createIdea = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Idea> => {
  const res = await api.post(`/ideas`, {
    ...newIdea,
    createdAt: new Date().toISOString(),
  });

  return res.data;
};

export const deleteIdea = async (ideaId: String): Promise<void> => {
  await api.delete(`/ideas/${ideaId}`);
};

export const updateIdea = async (
  ideaId: String,
  updatedIdea: {
    title: string;
    summary: string;
    description: string;
    tags: string[];
  }
): Promise<Idea> => {
  const res = await api.put(`/ideas/${ideaId}`, updatedIdea);
  return res.data;
};
