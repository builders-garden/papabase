"use client";
import { sliceAddress } from "@/app/lib/utils";
import DonateModal from "@/components/donate-modal";
import { PAPABASE_ADDRESS, chain } from "@/lib/constants";
import { PAPABASE_ABI } from "@/lib/contracts/abi";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Link,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";

export default function DonateCampaign({
  params: { id },
}: {
  params: { id: string };
}) {
  const [campaign, setCampaign] = useState<any | null>(null);
  const { user } = usePrivy();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amountRaised, setAmountRaised] = useState<number>(0);

  useEffect(() => {
    fetchCampaign();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      fetchCampaign();
    }
  }, [isOpen]);

  const fetchCampaign = async () => {
    const response = await fetch(`/api/campaigns/${id}`);
    const data = await response.json();

    console.log(data);
    setCampaign(data);

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const res = (await publicClient.readContract({
      address: PAPABASE_ADDRESS,
      abi: PAPABASE_ABI,
      functionName: "campaigns",
      args: [id],
    })) as any[];
    setAmountRaised(Number(res[3]) / 10 ** 6);
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
              <Button color="primary" onPress={() => onOpen()}>
                Donate
              </Button>
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
        <span className="font-clash-display">Amount raised:</span> $
        {amountRaised.toFixed(2)}
      </h3>
      <h3 className="text-xl md:text-2xl">
        <span className="font-clash-display">Donations</span>
      </h3>
      {campaign.donations.length === 0 && <p>No donations, yet!</p>}
      {campaign.donations.length > 0 && (
        <div className="flex flex-col space-y-4">
          {campaign.donations.map((donation: any) => (
            <Card key={`donation-${donation.id}`}>
              <CardHeader
                className="justify-between cursor-pointer"
                onClick={() => {
                  typeof window !== undefined &&
                    window.open(
                      `${chain.blockExplorers.default.url}/tx/${donation.txHash}`,
                      "_blank"
                    );
                }}
              >
                <div className="flex gap-5">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    title={donation.user.address}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {sliceAddress(donation.user.address)} donated $
                      {donation.amount}!
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {donation.createdAt}
                    </h5>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      <DonateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        campaignId={campaign.id}
      />
    </div>
  );
}
