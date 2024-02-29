import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button, Link } from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function DonateCampaign({
  params: { id },
}: {
  params: { id: string };
}) {
  const campaign = await prisma.campaign.findUniqueOrThrow({
    where: {
      id: parseInt(id),
    },
    include: {
      donations: {
        include: {
          user: true,
        },
      },
    },
  });
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col space-y-4 px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <div className="rounded-xl bg-primary py-24 w-full text-center aspect-square"></div>
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2 justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-clash-display">
                {campaign.name}
              </h3>
              {campaign.userId !== session?.user.id && (
                <Button color="primary">Donate</Button>
              )}
              {campaign.userId === session?.user.id && (
                <div className="flex flex-row space-x-2 items-center">
                  <Button color="primary">
                    <Pencil size={14} /> Edit
                  </Button>
                  <Button color="danger">
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <p>{campaign.description}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <h3 className="text-lg">
                <span className="font-clash-display">End date: </span>
                {campaign.endDate.toLocaleDateString()}
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
      <h3 className="text-2xl md:text-3xl">
        <span className="font-clash-display"> Amount raised:</span> $100.000
      </h3>
    </div>
  );
}
