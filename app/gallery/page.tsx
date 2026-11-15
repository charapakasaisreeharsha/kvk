import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import GalleryGrid, { type GalleryPhoto } from "./GalleryGrid";

export const dynamic = "force-dynamic";

// Original local photographs. Replace these captions with the verified historical descriptions.
const legacyPhotos: GalleryPhoto[] = [
  { id: "legacy-1", src: "/gallery/gallery-image-1.png", alt: "At a conference", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-2", src: "/gallery/gallery-image-2.png", alt: "With P. V. Narasimha Rao, Prof. Kuppa Venkata Krishna Murty, and R. Venkataraman", caption: "With P. V. Narasimha Rao (left), Prof. Kuppa Venkata Krishna Murty (centre), and former President of India R. Venkataraman (right).", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-3", src: "/gallery/gallery-image-3.png", alt: "Honourable Sri Justice A. Venkatarami Reddy presenting an award to Prof. Kuppa Venkata Krishna Murthy", caption: "Honourable Sri Justice A. Venkatarami Reddy, on the left, presenting an award to Prof. Kuppa Venkata Krishna Murthy (right), in the presence of Sri Ganapathy Sachchidananda Swamiji (centre).", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { id: "legacy-4", src: "/gallery/gallery-image-4.png", alt: "Prof. K. V. Krishna Murthy and Sadguru Sivananda Murthy Garu seated at an event ", caption: "Prof. K. V. Krishna Murthy and Sadguru Sivananda Murthy Garu seated at an event ", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { id: "legacy-5", src: "/gallery/gallery-image-5.png", alt: "Sh. K. V. Krishna Murthy welcoming Dr A.P.J. Abdul Kalam", caption: "Sh. K. V. Krishna Murthy, Chairman, I-SERVE, welcoming Dr A.P.J. Abdul Kalam on 30 July 2011 at the inauguration of the National Seminar, “Scientific Dating of Ancient Events before 2000 BC.”", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-6", src: "/gallery/gallery-image-6.png", alt: "Television appearance", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-7", src: "/gallery/gallery-image-7.png", alt: "Family", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-8", src: "/gallery/gallery-image-8.png", alt: "Manuscript work", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-9", src: "/gallery/gallery-image-9.png", alt: "With Jagadguru Sri Jayendra Saraswathi Shankaracharya Swamiga", caption: "With Jagadguru Sri Jayendra Saraswathi Shankaracharya Swamiga, 69th Shankaracharya and Peetadhipathi of the Kanchi Kamakoti Peetham.", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-10", src: "/gallery/gallery-image-10.png", alt: "With P. V. Narasimha Rao", caption: "With P. V. Narasimha Rao, former Prime Minister of India.", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-11", src: "/gallery/gallery-image-11.png", alt: "Moment eleven", caption: "Sushilkumar Shinde, an Indian politician and former Union Home Minister of India with Brahmasri Kuppa Venkata Krishna Murthy", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { id: "legacy-12", src: "/gallery/gallery-image-12.png", alt: "Moment twelve", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-13", src: "/gallery/gallery-image-13.png", alt: "Moment thirteen", caption: "", colSpan: "col-span-2", rowSpan: "row-span-4" },
  { id: "legacy-14", src: "/gallery/gallery-image-14.png", alt: "Moment fourteen", caption: "", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { id: "legacy-15", src: "/gallery/gallery-image-15.png", alt: "Moment fifteen", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-16", src: "/gallery/gallery-image-16.png", alt: "Moment sixteen", caption: "", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { id: "legacy-17", src: "/gallery/gallery-image-17.png", alt: "Moment seventeen", caption: "Introductory Classes on Panchanga Siddhanta (Almanac related Astronomy) seminar held from September 30 to October 2, 2007, in Hyderabad, organized by the Institute of Scientific Research on Vedas.", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-18", src: "/gallery/gallery-image-18.png", alt: "Moment eighteen", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: "legacy-19", src: "/gallery/gallery-image-19.png", alt: "Moment nineteen", caption: "", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { id: "legacy-20", src: "/gallery/gallery-image-20.png", alt: "Moment twenty", caption: "", colSpan: "col-span-2", rowSpan: "row-span-2" },
];

// Keep the selected historical photographs directly after current admin uploads.
const featuredLegacyPhotoIds = ["legacy-5", "legacy-2", "legacy-10"];
const featuredLegacyPhotos = featuredLegacyPhotoIds.flatMap((id) =>
  legacyPhotos.filter((photo) => photo.id === id),
);
const remainingLegacyPhotos = legacyPhotos.filter(
  (photo) => !featuredLegacyPhotoIds.includes(photo.id),
);

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_images").select("id, image_path, caption, alt_text, display_layout").order("created_at", { ascending: false });
  const clientPhotos: GalleryPhoto[] = (data ?? []).map((image) => ({ id: image.id, src: supabase.storage.from("gallery-images").getPublicUrl(image.image_path).data.publicUrl, alt: image.alt_text, caption: image.caption, colSpan: "col-span-2", rowSpan: image.display_layout === "portrait" ? "row-span-4" : "row-span-2" }));
  return <><Navbar /><main className="min-h-screen bg-[#efe9d3] px-5 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-32 lg:px-16 xl:px-24"><div className="mb-10 sm:mb-14"><p className="text-xs uppercase tracking-[0.3em] text-[#8a7a4f]">A life in fragments</p><h1 className="mt-3 font-serif text-5xl font-normal tracking-tight text-[#1a1a1a] sm:text-7xl">Gallery</h1><p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[#2a2a2a]/80 sm:text-base">A scrapbook of decades spent between palm-leaf manuscripts and lecture halls, gathered here as they were lived.</p></div><GalleryGrid photos={[...featuredLegacyPhotos, ...clientPhotos, ...remainingLegacyPhotos]} /></main><Footer /></>;
}
