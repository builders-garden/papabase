import { prisma } from "@/lib/prisma";

export default async function DonateDashboard() {
  const [activeCampaigns, closedCampaigns] = await Promise.all([
    prisma.campaign.findMany({
      where: { status: "ACTIVE" },
    }),
    prisma.campaign.findMany({
      where: { status: "CLOSED" },
    }),
  ]);
  return (
    <div className="flex flex-col py-8 space-y-8 px-4 md:px-0">
      <div className="rounded-xl bg-primary py-24 w-full text-center">
        <h1 className="text-4xl md:text-7xl font-clash-display text-white">
          papabase
        </h1>
        <h2 className="text-xl md:text-2xl text-white">
          web3 is just a family business
        </h2>
      </div>
      <div className="flex flex-col">
        <h3 className="font-clash-display text-xl md:text-3xl">
          Active Campaigns
        </h3>
        {activeCampaigns.length === 0 && <p>No active campaigns</p>}
        {activeCampaigns.length > 0 && (
          <div className="flex flex-row mt-4 overflow-x-scroll">
            {activeCampaigns.map((campaign) => (
              <div
                className="p-4 bg-primary rounded-xl text-white aspect-square h-[200px] mr-4"
                key={campaign.id}
              >
                <h4 className="text-2xl">{campaign.name}</h4>
                <h5 className="text-sm">{campaign.description}</h5>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="font-clash-display text-xl md:text-3xl">
          Closed Campaigns
        </h3>
        {closedCampaigns.length === 0 && <p>No closed campaigns, yet!</p>}
      </div>
    </div>
  );
}
