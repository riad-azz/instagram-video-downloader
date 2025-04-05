import { useMutation } from "@tanstack/react-query";

import { useGetInstagramPost } from "@/features/api/requests/instagram";

export const useGetInstagramPostMutation = () => {
  const fetch = useGetInstagramPost();

  const mutation = useMutation({
    mutationFn: fetch,
    mutationKey: ["getInstagramPost"],
    retry: false,
  });

  return mutation;
};
