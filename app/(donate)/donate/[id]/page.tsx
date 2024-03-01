"use client";
import { Button, Link, Skeleton } from "@nextui-org/react";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export default function DonateCampaign({
  params: { id },
}: {
  params: { id: string };
}) {
  const [campaign, setCampaign] = useState<any | null>(null);
  const { user } = usePrivy();

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    const response = await fetch(`/api/campaigns/${id}`);
    const data = await response.json();
    setCampaign(data);
  };

  if (!campaign) {
    return (
      <div className="flex flex-col space-y-4 px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <Skeleton className="w-full aspect-square rounded-xl" />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2 justify-between">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center justify-between">
                <h3 className="text-2xl md:text-3xl font-clash-display">
                  <Skeleton className="w-[100px] h-6 rounded-lg" />
                </h3>
              </div>
              <Skeleton className="w-[100px] h-6 rounded-lg" />
              <Skeleton className="w-[150px] h-6 rounded-lg" />
              <Skeleton className="w-[80px] h-6 rounded-lg" />
            </div>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl flex flex-row items-center">
          <span className="font-clash-display">Amount raised:</span>{" "}
          <Skeleton className="w-[100px] h-6 rounded-lg ml-2" />
        </h3>
        <h3 className="text-xl md:text-2xl">
          <span className="font-clash-display">Donations</span>
        </h3>
        <Skeleton className="w-[100px] h-6 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <div
            className="rounded-xl bg-primary w-full text-center aspect-square"
            style={{
              backgroundImage: `url('${campaign.imageUrl}')`,
              backgroundPosition: "center",
              objectFit: "fill",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2 justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-clash-display">
                {campaign.name}
              </h3>
              {user && campaign.userId !== user.id && (
                <Button color="primary">Donate</Button>
              )}
              {/* {user && campaign.userId === user.id && (
                <div className="flex flex-row space-x-2 items-center">
                  <Button color="primary">
                    <Pencil size={14} /> Edit
                  </Button>
                  <Button color="danger">
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              )} */}
            </div>
            <p>{campaign.description}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <h3 className="text-lg">
                <span className="font-clash-display">End date: </span>
                {campaign.endDate}
              </h3>
            </div>
            <h3 className="text-lg">
              <span className="font-clash-display">Github repo: </span>
              <Link href={campaign.githubRepoUrl}>
                {campaign.githubRepoUrl}
              </Link>
            </h3>
            {campaign.websiteUrl && (
              <h3 className="text-lg">
                <span className="font-clash-display">Website: </span>
                <Link href={campaign.websiteUrl}>{campaign.websiteUrl}</Link>
              </h3>
            )}
          </div>
        </div>
      </div>
      <h3 className="text-xl md:text-2xl">
        <span className="font-clash-display">Amount raised:</span> $100.000
      </h3>
      <h3 className="text-xl md:text-2xl">
        <span className="font-clash-display">Donations</span>
      </h3>
      {campaign.donations.length === 0 && <p>No donations, yet!</p>}
    </div>
  );
}
