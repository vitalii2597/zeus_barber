"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { createClient } from "@/lib/supabase/client";
import type { GalleryImage } from "@/lib/supabase/types";

interface GalleryClientProps {
  initialImages: GalleryImage[];
}

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const uploadFile = useCallback(
    async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(path);

      const { data, error: insertError } = await supabase
        .from("gallery_images")
        .insert({
          url: publicUrl,
          storage_path: path,
          alt: file.name.replace(/\.[^.]+$/, ""),
          sort_order: images.length,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return data as GalleryImage;
    },
    [supabase, images.length]
  );

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const newImages: GalleryImage[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const img = await uploadFile(file);
        newImages.push(img);
      }
      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Błąd podczas uploadu. Spróbuj ponownie.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(image: GalleryImage) {
    if (!confirm("Usunąć to zdjęcie?")) return;

    await supabase.storage.from("gallery").remove([image.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", image.id);

    setImages((prev) => prev.filter((img) => img.id !== image.id));
  }

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setImages(reordered);

    // Persist new order
    await Promise.all(
      reordered.map((img, i) =>
        supabase
          .from("gallery_images")
          .update({ sort_order: i })
          .eq("id", img.id)
      )
    );
  }

  return (
    <div>
      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-none p-12 text-center cursor-pointer transition-colors mb-8 ${
          dragOver
            ? "border-gold bg-gold/10"
            : "border-gold/30 hover:border-gold/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <p className="text-gold animate-pulse text-sm tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cinzel)" }}>
            Uploading...
          </p>
        ) : (
          <>
            <div className="text-gold text-3xl mb-3">+</div>
            <p className="text-cream/60 text-sm mb-1">
              Przeciągnij zdjęcia lub kliknij, aby wybrać
            </p>
            <p className="text-cream/30 text-xs">JPG, PNG, WEBP</p>
          </>
        )}
      </div>

      {/* Image grid with drag-and-drop reorder */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {images.map((img, index) => (
                <Draggable key={img.id} draggableId={img.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative aspect-square group border transition-colors ${
                        snapshot.isDragging
                          ? "border-gold shadow-lg shadow-gold/20"
                          : "border-gold/10 hover:border-gold/40"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt ?? ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(img);
                          }}
                          className="px-3 py-1.5 bg-red-900/80 text-red-300 text-xs tracking-widest uppercase hover:bg-red-800 transition-colors"
                          style={{ fontFamily: "var(--font-cinzel)" }}
                        >
                          Usuń
                        </button>
                      </div>
                      <div className="absolute top-1 left-1 bg-bg/60 px-1.5 py-0.5 text-xs text-cream/40">
                        {index + 1}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {images.length === 0 && !uploading && (
        <p className="text-center text-cream/30 text-sm mt-8">
          Brak zdjęć. Dodaj pierwsze zdjęcie powyżej.
        </p>
      )}
    </div>
  );
}
