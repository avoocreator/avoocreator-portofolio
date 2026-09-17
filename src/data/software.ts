import type { LucideIcon } from 'lucide-react'
import { Code2, GitBranch, Globe, Terminal } from 'lucide-react'
import { Frame, Image as ImageIcon, PenTool, LayoutTemplate } from 'lucide-react'
import { CircuitBoard, Wifi, Cpu, Blocks } from 'lucide-react'
import { BookOpen, NotebookText, Table2, Presentation } from 'lucide-react'

export interface SoftwareItem {
  name: string
  icon: LucideIcon
}
export const softwareByCategory: Record<string, SoftwareItem[]> = {
  development: [
    { name: 'VS Code', icon: Code2 },
    { name: 'GitHub', icon: GitBranch },
    { name: 'Browser DevTools', icon: Globe },
    { name: 'Terminal', icon: Terminal },
  ],
  design: [
    { name: 'Figma', icon: Frame },
    { name: 'Photoshop', icon: ImageIcon },
    { name: 'Illustrator', icon: PenTool },
    { name: 'Canva', icon: LayoutTemplate },
  ],
  'creative-tech': [
    { name: 'Arduino IDE', icon: CircuitBoard },
    { name: 'IoT Devices', icon: Wifi },
    { name: 'Electronics', icon: Cpu },
    { name: 'Prototyping', icon: Blocks },
  ],
  research: [
    { name: 'Google Scholar', icon: BookOpen },
    { name: 'Notion', icon: NotebookText },
    { name: 'Spreadsheet', icon: Table2 },
    { name: 'Slides', icon: Presentation },
  ],
}