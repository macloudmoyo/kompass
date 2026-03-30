import { useParams } from 'react-router-dom'

function AccountDetail() {
  const { accountId } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-kompass-text-primary">Account Detail</h1>
      <p className="mt-2 text-kompass-text-secondary">Account {accountId} — placeholder</p>
    </div>
  )
}

export default AccountDetail
