import Image from "next/image";
import { images } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactCTA() { return <section className="contact-cta"><Image src={images.cta} alt="Warm architectural bathroom by Aurelia Bath" fill sizes="100vw" /><div className="contact-cta__shade" /><div className="contact-cta__content"><span className="eyebrow">Begin a conversation</span><h2>Create your next<br />bathroom space <em>with us.</em></h2><div><MagneticButton light href="#collections">View collection</MagneticButton><MagneticButton light href="mailto:studio@aureliabath.com">Talk to our team</MagneticButton></div></div></section>; }
