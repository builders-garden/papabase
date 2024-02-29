"use client";
import { sliceAddress } from "@/app/lib/utils";
import { getViemClient } from "@/app/lib/viem";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Octokit } from "@octokit/rest";
import {
  ConnectButton,
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";
import { ArrowLeft, Check, Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewCampaignPage() {
  const [step, setStep] = useState<number>(0);
  const { data: session } = useSession();
  const account = useAccount();
  const provider = useParticleProvider();
  const [repos, setRepos] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [receiver, setReceiver] = useState<string>(account || "");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [value, setValue] = useState<any>(null);
  const [duration, setDuration] = useState<any>("30");
  const [loading, setLoading] = useState<boolean>(false);
  const [campaignId, setCampaignId] = useState<string>("");

  useEffect(() => {
    if (session && session?.user.accessToken) {
      fetchRepos();
    }
  }, [session]);

  useEffect(() => {
    if (account && session) setStep(1);
  }, [account, session]);

  const fetchRepos = async () => {
    const octokit = new Octokit({
      auth: session?.user.accessToken,
    });
    const { data } = await octokit.repos.listForAuthenticatedUser();
    console.log(data);
    setRepos(data);
  };

  const createCampaign = async () => {
    setLoading(true);
    try {
      const client = getViemClient(provider);
      // if (client) {
      // const signer = toEthersWeb3ProviderWithSigner(client as any);
      // const xmtpClient = await Client.create(signer.getSigner());
      // const group = await xmtpClient.
      const repo = repos.find((repo: any) => repo.id === parseInt(value));
      // console.log(repo);

      // end date is now + 1 year
      const endDate = Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000;
      const body = {
        name: title,
        description,
        recipientAddress: receiver,
        websiteUrl,
        githubRepoId: repo.id.toString(),
        githubRepoUrl: repo.url,
        imageUrl: "https://via.placeholder.com/150",
        endDate,
      };
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setCampaignId((await res.json()).id);
      setStep(step + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <>
            <h3 className="text-2xl md:text-3xl font-clash-display">
              Campaign created successfully!
            </h3>
            <p>
              Go check your campaign on the following{" "}
              <Link
                href={`/donate/${campaignId}`}
                className="font-clash-display text-primary"
              >
                link
              </Link>
              .
            </p>
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-2xl md:text-3xl font-clash-display">
              Create your campaign
            </h3>
            <p>
              Start now by creating your first campaign on{" "}
              <span className="font-clash-display text-primary">papabase</span>.
            </p>
            {session && (
              <Select
                label="Select a Github repository"
                className="mt-4"
                selectedKeys={value ? [value] : []}
                onChange={(e) => setValue(e.target.value)}
                isRequired
              >
                {repos.map((repo) => (
                  <SelectItem
                    key={repo.id}
                    value={repo}
                    textValue={`${repo.owner.login}/${repo.name}`}
                  >
                    {repo.owner.login}/{repo.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            <Input
              label="Campaign title"
              className="mt-4"
              placeholder="My awesome campaign"
              value={title}
              onValueChange={(e) => setTitle(e)}
              isRequired
            />
            <Textarea
              label="Campaign description"
              placeholder="Enter your campaign description here. We support markdown as well!"
              className="mt-4"
              value={description}
              onValueChange={(e) => setDescription(e)}
              isRequired
            />

            <Select
              label="Campaign duration"
              placeholder="Select a duration for the campaign"
              className="mt-4"
              selectedKeys={duration ? [duration] : []}
              onChange={(e) => setDuration(e.target.value)}
            >
              <SelectItem key={"30"} value={"30"}>
                30 days
              </SelectItem>
              <SelectItem key={"90"} value={"90"}>
                90 days
              </SelectItem>
              <SelectItem key={"180"} value={"180"}>
                180 days
              </SelectItem>
              <SelectItem key={"365"} value={"365"}>
                1 year
              </SelectItem>
              <SelectItem key={"730"} value={"730"}>
                2 years
              </SelectItem>
            </Select>
            <Input
              label="Project website URL"
              className="mt-4"
              placeholder="https://example.com"
              value={websiteUrl}
              onValueChange={(e) => setWebsiteUrl(e)}
            />
            <Input
              label="Receiver"
              className="mt-4"
              placeholder="Address that will receive the campaign funds"
              value={receiver}
              onValueChange={(e) => setReceiver(e)}
            />

            <div className="flex-1"></div>
            <Button
              color="primary"
              isDisabled={!title || !description || !value}
              isLoading={loading}
              onPress={() => createCampaign()}
            >
              Create campaign
            </Button>
          </>
        );
      default:
        return (
          <div className="flex flex-col space-y-4">
            <h3 className="text-3xl font-clash-display">Create your account</h3>
            <p>Connect your Github account</p>
            {!session && (
              <Button className="mt-4" onPress={() => signIn("github")}>
                <Github />
                Connect Github
              </Button>
            )}
            {session && (
              <Button className="mt-4">
                Github connected
                <Check color="green" />
              </Button>
            )}
            <p>Connect or create your Web3 wallet</p>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                openChainModal,
                accountLoading,
              }) => {
                console.log(account);
                if (account) {
                  return (
                    <Button
                      color="primary"
                      onClick={() => openAccountModal!()}
                      variant="flat"
                    >
                      {sliceAddress(account)}
                    </Button>
                  );
                }
                return (
                  <Button
                    color="primary"
                    className="w-full"
                    onPress={() => openConnectModal!()}
                  >
                    Connect wallet
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        );
    }
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:flex bg-primary flex-col items-center justify-center h-full w-full relative">
        <Link href={"/"}>
          <ArrowLeft
            className="text-white absolute top-4 left-4 cursor-pointer hover:-translate-y-1 transition-transform"
            size={24}
          />
        </Link>
        <h1 className="text-7xl font-clash-display text-white">papabase</h1>
        <h2 className="text-2xl text-white">web3 is just a family business</h2>
      </div>
      <div className="bg-white flex flex-col p-8 md:p-12">{renderStep()}</div>
    </main>
  );
}
