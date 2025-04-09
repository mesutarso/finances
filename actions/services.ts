"use server";

import { services } from "@/lib/strapi";

export const getLatestServices = async () => {
  const { data } = await services.find({
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 6,
    },
  });
  return data?.map((service: any) => ({
    title: service.titre,
    description: service.description,
    link: service.lien,
    type: service.type,
  }));
};

export const getAllServices = async () => {
  const { data } = await services.find({
    sort: ["createdAt:desc"],
  });
  return data?.map((service: any) => ({
    title: service.titre,
    description: service.description,
    link: service.lien,
    type: service.type,
  }));
};
