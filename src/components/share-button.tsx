"use client";

import { Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Option } from "@/lib/type";

export function ShareButton({
  options,
  title,
  fullPath,
}: {
  options: Omit<Option, "id" | "image">[];
  title: string;
  fullPath: string;
}) {
  const text = `${title}

${options.map((option) => `- ${option.name}`).join("\n")}

Berikan suara anda, klik link
${fullPath}

Tolong forward ke gorup dan teman-temanmu ya. Terima kasih
`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border">
          <Share2 className="mr-3 h-4 w-4" />
          Bagikan Poling
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div>
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-lg">Bagikan Polling</DialogTitle>
          </DialogHeader>

          <div className="my-4">
            <p className="text-sm">Share this link via</p>

            <div className="my-4 flex justify-around">
              <WhatsappShareButton
                url={text}
                windowWidth={720}
                windowHeight={720}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <TelegramShareButton
                url={text}
                windowWidth={720}
                windowHeight={720}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <TwitterShareButton
                url={text}
                windowWidth={720}
                windowHeight={720}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <FacebookShareButton
                url={text}
                windowWidth={720}
                windowHeight={720}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <p className="text-sm">Or copy link</p>
            <div className="mt-4 flex items-center justify-between border-2 border-input py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="ml-2 fill-gray-500"
              >
                <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
              </svg>

              <input
                className="w-full bg-transparent outline-none mx-2"
                type="text"
                placeholder="link"
                value={fullPath}
              />
              <Button
                className="mr-2 focus-visible:ring-0"
                onClick={() => navigator.clipboard.writeText(fullPath)}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// {/* WHATSAPP */}
// <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-green-200 fill-[#25D366] shadow-xl hover:bg-[#25D366] hover:fill-white hover:shadow-green-500/50">
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path
//       fill-rule="evenodd"
//       clip-rule="evenodd"
//       d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
//     ></path>
//   </svg>
// </div>
//
// {/* TELEGRAM */}
// <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-sky-200 fill-[#229ED9] shadow-xl hover:bg-[#229ED9] hover:fill-white hover:shadow-sky-500/50">
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
//   </svg>
// </div>
//
// {/* FACEBOOK */}
// <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-blue-200 fill-[#1877f2] shadow-xl hover:bg-[#1877f2] hover:fill-white hover:shadow-blue-500/50">
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
//   </svg>
// </div>
//
// {/* TWITTER */}
// <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-blue-200 fill-[#1d9bf0] shadow-xl hover:bg-[#1d9bf0] hover:fill-white hover:shadow-sky-500/50">
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
//   </svg>
// </div>
