import { participationCategories } from '../../data/participation'
import { FolderCard } from '../ui/FolderCard'
import { SectionHeading } from '../ui/SectionHeading'

export function Participation() {
  return (
    <section id="participation" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading
          index="03"
          tag="Partisipasi"
          title="Jejak keterlibatan"
          description="Organisasi, kompetisi, dan proyek yang pernah dijalani. Arahkan kursor ke folder, lalu klik untuk lihat detail lengkapnya."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8">
          {participationCategories.map((category) => (
            <FolderCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}