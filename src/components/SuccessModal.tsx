import { useForm } from '../context/FormContext'
import { useNavigate } from 'react-router-dom'

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
	const { formData, resetForm } = useForm()
	const navigate = useNavigate()

	if (!isOpen) return null

	const handleClose = () => {
		onClose()
		resetForm()
		navigate('/personal')
	}

	const formatAmount = (amount: number) => `$${amount}`

	const formatTerm = (term: number) => {
		if (term === 1) return `${term} день`
		if (term >= 2 && term <= 4) return `${term} дня`
		return `${term} дней`
	}

	return (
		<>
			<div className='modal-backdrop fade show' onClick={handleClose}></div>

			<div
				className='modal fade show'
				style={{ display: 'block' }}
				tabIndex={-1}
				role='dialog'
				aria-labelledby='successModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered' role='document'>
					<div className='modal-content'>
						<div className='modal-header bg-success text-white'>
							<h5
								className='modal-title d-flex align-items-center'
								id='successModalLabel'
							>
								<span className='icon icon-check me-2'></span>
								Application Approved!
							</h5>
							<button
								type='button'
								className='btn-close btn-close-white'
								onClick={handleClose}
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body text-center py-4'>
							<div className='mb-4'>
								<div className='display-4 text-success mb-3'>✓</div>
								<h4 className='text-success mb-3'>Congratulations!</h4>
							</div>

							<div className='alert alert-success mb-4' role='alert'>
								<div className='h5 mb-0'>
									Congratulations,{' '}
									<strong>
										{formData.personal.lastName} {formData.personal.firstName}
									</strong>
									!
								</div>
								<div className='mt-2'>
									Your loan of{' '}
									<strong className='text-success'>
										{formatAmount(formData.loan.amount)}
									</strong>{' '}
									for{' '}
									<strong className='text-success'>
										{formatTerm(formData.loan.term)}
									</strong>{' '}
									has been approved.
								</div>
							</div>

							<div className='card bg-light border-0'>
								<div className='card-body'>
									<h6 className='card-title text-center mb-3'>
										Application Details
									</h6>
									<div className='row text-start'>
										<div className='col-6'>
											<small className='text-muted'>First Name:</small>
											<br />
											<strong>{formData.personal.firstName}</strong>
										</div>
										<div className='col-6'>
											<small className='text-muted'>Last Name:</small>
											<br />
											<strong>{formData.personal.lastName}</strong>
										</div>
										<div className='col-6 mt-2'>
											<small className='text-muted'>Phone:</small>
											<br />
											<strong>{formData.personal.phone}</strong>
										</div>
										<div className='col-6 mt-2'>
											<small className='text-muted'>Gender:</small>
											<br />
											<strong>
												{formData.personal.gender === 'male'
													? 'Male'
													: 'Female'}
											</strong>
										</div>
										<div className='col-12 mt-2'>
											<small className='text-muted'>Workplace:</small>
											<br />
											<strong>{formData.address.workplace}</strong>
										</div>
										<div className='col-12 mt-2'>
											<small className='text-muted'>Address:</small>
											<br />
											<strong>{formData.address.address}</strong>
										</div>
										<div className='col-6 mt-2'>
											<small className='text-muted'>Loan Amount:</small>
											<br />
											<strong className='text-success'>
												{formatAmount(formData.loan.amount)}
											</strong>
										</div>
										<div className='col-6 mt-2'>
											<small className='text-muted'>Loan Term:</small>
											<br />
											<strong className='text-success'>
												{formatTerm(formData.loan.term)}
											</strong>
										</div>
									</div>
								</div>
							</div>

							<div className='text-center mt-4'>
								<p className='text-muted mb-0'>
									<small>
										Our manager will contact you shortly to finalize your loan.
									</small>
								</p>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-success btn-lg w-100'
								onClick={handleClose}
							>
								<span className='icon icon-check me-2'></span>
								Got it
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
