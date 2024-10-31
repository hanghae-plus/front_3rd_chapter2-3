interface InfoItemProps {
  label: string
  value: string
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="grid grid-cols-3 gap-2">
    <span className="font-medium text-muted-foreground">{label}:</span>
    <span className="col-span-2">{value}</span>
  </div>
)

export default InfoItem
