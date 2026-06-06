import { useState } from 'react'
import Vendors from "./Vendors";

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'rfqs', label: "RFQ's" },
  { id: 'quotations', label: 'Quotations' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'purchase-orders', label: 'Purchase orders' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'reports', label: 'Reports' },
  { id: 'activity', label: 'Activity' },
]

function Dashboard({ session, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar" aria-label="Main navigation">
        <div className="sidebar-brand">
          <span className="brand-mark">VB</span>
          <span className="brand-name">VendorBridge</span>
        </div>
        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`dashboard-nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">
        {activePage === 'dashboard' ? (
          <>
            <header className="dashboard-header">
              <div>
                <p className="dashboard-welcome">Dashboard</p>
                <h1>Welcome back, {session.name}</h1>
                <p className="dashboard-subtitle">Procurement Officer · Today’s overview</p>
              </div>
              <button type="button" className="secondary-button" onClick={onLogout}>
                Logout
              </button>
            </header>

            <section className="dashboard-summary">
              <article className="summary-card">
                <span className="summary-value">12</span>
                <p>Active RFQ’s</p>
              </article>
              <article className="summary-card">
                <span className="summary-value">5</span>
                <p>Pending approvals</p>
              </article>
              <article className="summary-card">
                <span className="summary-value">$2.3L</span>
                <p>PO’s this month</p>
              </article>
              <article className="summary-card">
                <span className="summary-value">3</span>
                <p>Overdue invoices</p>
              </article>
            </section>

            <section className="dashboard-grid">
              <div className="recent-orders card">
                <div className="card-header">
                  <h2>Recent Purchase Orders</h2>
                </div>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>PO#</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PO1</td>
                      <td>Infra</td>
                      <td>$9,000</td>
                      <td className="status approved">Approved</td>
                    </tr>
                    <tr>
                      <td>PO2</td>
                      <td>Tech core</td>
                      <td>$14,000</td>
                      <td className="status pending">Pending</td>
                    </tr>
                    <tr>
                      <td>PO3</td>
                      <td>Official Co</td>
                      <td>$34,000</td>
                      <td className="status draft">Draft</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="spending-card card">
                <div className="card-header">
                  <h2>Spending trends</h2>
                </div>
                <div className="spending-chart">
                  <div className="chart-legend">
                    <span />
                    <p>Last 6 months</p>
                  </div>
                  <div className="chart-placeholder">Chart preview</div>
                </div>
              </div>
            </section>

            <footer className="dashboard-actions">
              <button className="primary-button" type="button">+ New RFQ</button>
              <button className="secondary-button" type="button">Add Vendor</button>
              <button className="secondary-button" type="button">View Invoices</button>
            </footer>
          </>
        ) : activePage === 'rfqs' ? (
          <section className="rfqs-page">
            <div className="rfqs-header">
              <div>
                <p className="rfqs-title">Create RFQ's</p>
                <h2>new request for quotation</h2>
              </div>
              <div className="rfq-steps">
                <div className="rfq-step active">1</div>
                <div className="rfq-step">2</div>
                <div className="rfq-step">3</div>
              </div>
            </div>

            <div className="rfq-layout">
              <div className="rfq-left card">
                <label>
                  RFQ's title*
                  <input type="text" defaultValue="Office Furniture procurement q2" />
                </label>
                <label>
                  Category
                  <input type="text" defaultValue="Furniture" />
                </label>
                <label>
                  Deadline*
                  <input type="date" defaultValue="2025-06-15" />
                </label>
                <label>
                  Description
                  <textarea defaultValue="Ergonomic chairs and standing desks for 3rd floor" />
                </label>
              </div>

              <div className="rfq-right">
                <div className="line-items card">
                  <div className="card-header">
                    <h3>Line items</h3>
                  </div>
                  <table className="line-items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ergonomic chair</td>
                        <td>25</td>
                        <td>NOS</td>
                      </tr>
                      <tr>
                        <td>Standing desks</td>
                        <td>10</td>
                        <td>NOS</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="secondary-button small" type="button">+ add line item</button>
                </div>

                <div className="assign-vendors card">
                  <div className="card-header">
                    <h3>Assign vendors</h3>
                  </div>
                  <ul className="vendor-list">
                    <li>
                      Infra Supplies Pvt Ltd
                      <button type="button">×</button>
                    </li>
                    <li>
                      Techcore LTD
                      <button type="button">×</button>
                    </li>
                  </ul>
                  {/* <button className="secondary-button small" type="button">+ add vendor</button> */}
                  <button onClick={() => setActivePage("vendors")}>Vendors</button>
                </div>
              </div>
            </div>

            <div className="rfq-footer">
              <div className="attachments card">
                <div className="card-header">
                  <h3>Attachments</h3>
                </div>
                <div className="attachments-dropzone">Drag & drop files or click to upload</div>
              </div>
              <div className="rfq-actions">
                <button className="secondary-button" type="button">Save as Draft</button>
                <button className="primary-button" type="button">Save & Send to Vendors</button>
              </div>
            </div>
          </section>
        ) : activePage === 'vendors' ? (
          <Vendors />
          
        ) : activePage === 'quotations' ? (
          <section className="quotations-page">
            <div className="quotations-header">
              <div>
                <p className="quotations-title">Submit Quotations</p>
                <h2>RFQ: office furniture procurement q2 - deadline 15 june 2025</h2>
              </div>
            </div>

            <div className="quotations-body">
              <div className="rfq-summary card">
                <p className="section-label">RFQ Summary</p>
                <div className="rfq-summary-box">Ergonomic chair * 25, standing desk * 10 - category furniture</div>
              </div>

              <div className="quotation-table-card card">
                <p className="section-label">Your Quotation</p>
                <div className="quotation-table-wrap">
                  <table className="quotation-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Unit price</th>
                        <th>Total</th>
                        <th>Delivery (days)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ergonomic chair</td>
                        <td>25</td>
                        <td>3500</td>
                        <td>87,500</td>
                        <td>7</td>
                      </tr>
                      <tr>
                        <td>Tech Core LTD</td>
                        <td>10</td>
                        <td>8,200</td>
                        <td>82,000</td>
                        <td>14</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="quotation-form-grid">
                <div className="quotation-form-left">
                  <div className="form-group card">
                    <label>
                      tax / GST %
                      <input type="text" defaultValue="18 %" />
                    </label>
                  </div>
                  <div className="form-group card">
                    <label>
                      note / terms
                      <textarea defaultValue="Payment terms: 20 days net..." />
                    </label>
                  </div>
                </div>

                <div className="quotation-totals card">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>1,69,599</span>
                  </div>
                  <div className="total-row">
                    <span>GST (18%)</span>
                    <span>30,510</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Grand total</span>
                    <span>2,00,010</span>
                  </div>
                </div>
              </div>

              <div className="quotations-actions">
                <button className="primary-button" type="button">Submit Quotation</button>
                <button className="secondary-button" type="button">Save Draft</button>
              </div>
            </div>
          </section>
        ) : activePage === 'approvals' ? (
          <section className="approvals-page">
            <div className="approvals-header">
              <div>
                <p className="approvals-title">Approval Workflow</p>
                <h2>RFQ: office furniture Q2 - Vendor: Infra Supplies - 185400</h2>
              </div>
            </div>

            <div className="approvals-layout">
              <div className="approvals-left card">
                <div className="approval-steps">
                  <div className="approval-step completed">
                    <span>1</span>
                    <p>Submitted</p>
                  </div>
                  <div className="approval-step completed">
                    <span>2</span>
                    <p>L1 Review</p>
                  </div>
                  <div className="approval-step active">
                    <span>3</span>
                    <p>L2 Approval</p>
                  </div>
                  <div className="approval-step">
                    <span>4</span>
                    <p>Generate PO</p>
                  </div>
                </div>

                <div className="approval-chain card">
                  <div className="chain-item approved">
                    <div>
                      <strong>Rahul Mehta</strong>
                      <p>Procurement head</p>
                    </div>
                    <span>Approved on may 20, 10:32 AM</span>
                  </div>
                  <div className="chain-item pending">
                    <div>
                      <strong>Priya Shah</strong>
                      <p>Finance manager</p>
                    </div>
                    <span>Awaiting - Assigned may 21</span>
                  </div>
                </div>

                <div className="approval-remarks card">
                  <label>
                    Approval Remarks
                    <textarea placeholder="Add your comments or conditions..." />
                  </label>
                </div>
              </div>

              <div className="approvals-right card">
                <div className="card-header">
                  <h3>Quotations summary</h3>
                </div>
                <div className="quotation-summary">
                  <div className="summary-row">
                    <span>Vendor:</span>
                    <strong>Infra Supplies PVT LTD</strong>
                  </div>
                  <div className="summary-row">
                    <span>Total:</span>
                    <strong>1,85,400</strong>
                  </div>
                  <div className="summary-row">
                    <span>Delivery:</span>
                    <strong>10 days</strong>
                  </div>
                  <div className="summary-row">
                    <span>Rating:</span>
                    <strong>4.5/5</strong>
                  </div>
                </div>

                <div className="approvals-actions">
                  <button className="primary-button" type="button">Approve</button>
                  <button className="secondary-button" type="button">Reject</button>
                </div>
              </div>
            </div>
          </section>
        ) : activePage === 'purchase-orders' ? (
          <section className="purchase-orders-page">
            <div className="po-header">
              <div>
                <p className="po-title">Purchase Order & Invoice</p>
                <h2>PO-2024-auto-generated after approval</h2>
              </div>
              <div className="po-action-buttons">
                <button className="secondary-button" type="button">Download PDF</button>
                <button className="secondary-button" type="button">Print</button>
                <button className="secondary-button" type="button">Email invoice</button>
              </div>
            </div>

            <div className="po-bill card">
              <div className="po-bill-column">
                <p className="po-label">Bill to:</p>
                <p>Your Organization Name</p>
                <p>123 business park, ahmedabad</p>
                <p>GSTIN: 25383438AFB</p>
                <p>PO Number: PO-2025-0068</p>
                <p>PO date: 21 may, 2025</p>
              </div>
              <div className="po-bill-column">
                <p className="po-label">Vendor</p>
                <p>Infra supplies pvt ltd</p>
                <p>456, industrial estate, surat</p>
                <p>GSTIN: 3434343DB4523</p>
                <p>invoice date: 22 may 2025</p>
                <p>Due date: 21 june 2025</p>
              </div>
            </div>

            <div className="po-items card">
              <table className="po-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ergonomic chair</td>
                    <td>25</td>
                    <td>3500</td>
                    <td>87,500</td>
                  </tr>
                  <tr>
                    <td>Tech Core LTD</td>
                    <td>10</td>
                    <td>8,200</td>
                    <td>82,000</td>
                  </tr>
                </tbody>
              </table>

              <div className="po-totals">
                <div className="po-total-row">
                  <span>Subtotal</span>
                  <span>1,69,500</span>
                </div>
                <div className="po-total-row">
                  <span>CGST (9%)</span>
                  <span>15,255</span>
                </div>
                <div className="po-total-row">
                  <span>SGST (9%)</span>
                  <span>15,255</span>
                </div>
                <div className="po-total-row grand-total">
                  <span>Grand total</span>
                  <span>2,00,010</span>
                </div>
              </div>
            </div>

            <div className="po-status card">
              <span className="po-status-badge">Pending Payment</span>
              <button className="link-button" type="button">Mark as Paid</button>
            </div>
          </section>
        ) : activePage === 'invoices' ? (
          <section className="invoices-page">
            <div className="invoices-header">
              <div>
                <p className="invoices-title">Purchase Order & Invoice</p>
                <h2>PO-2024-auto-generated after approval</h2>
              </div>
              <div className="invoice-action-buttons">
                <button className="secondary-button" type="button">Download PDF</button>
                <button className="secondary-button" type="button">Print</button>
                <button className="secondary-button" type="button">Email invoice</button>
              </div>
            </div>

            <div className="invoice-bill card">
              <div className="invoice-bill-column">
                <p className="invoice-label">Bill to:</p>
                <p>Your Organization Name</p>
                <p>123 business park, ahmedabad</p>
                <p>GSTIN: 25383438AFB</p>
                <p>PO Number: PO-2025-0068</p>
                <p>PO date: 21 may, 2025</p>
              </div>
              <div className="invoice-bill-column">
                <p className="invoice-label">Vendor</p>
                <p>Infra supplies pvt ltd</p>
                <p>456, industrial estate, surat</p>
                <p>GSTIN: 3434343DB4523</p>
                <p>invoice date: 22 may 2025</p>
                <p>Due date: 21 june 2025</p>
              </div>
            </div>

            <div className="invoice-items card">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ergonomic chair</td>
                    <td>25</td>
                    <td>3500</td>
                    <td>87,500</td>
                  </tr>
                  <tr>
                    <td>Tech Core LTD</td>
                    <td>10</td>
                    <td>8,200</td>
                    <td>82,000</td>
                  </tr>
                </tbody>
              </table>

              <div className="invoice-totals">
                <div className="invoice-total-row">
                  <span>Subtotal</span>
                  <span>1,69,500</span>
                </div>
                <div className="invoice-total-row">
                  <span>CGST (9%)</span>
                  <span>15,255</span>
                </div>
                <div className="invoice-total-row">
                  <span>SGST (9%)</span>
                  <span>15,255</span>
                </div>
                <div className="invoice-total-row grand-total">
                  <span>Grand total</span>
                  <span>2,00,010</span>
                </div>
              </div>
            </div>

            <div className="invoice-status card">
              <span 
                className="invoice-status-badge" 
                onClick={() => setShowPaymentModal(!showPaymentModal)}
                style={{ cursor: 'pointer' }}
              >
                Pending Payment
              </span>
              <button 
                className="link-button" 
                type="button"
                onClick={() => setShowPaymentModal(!showPaymentModal)}
              >
                Mark as Paid
              </button>
            </div>

            {showPaymentModal && (
              <div className="payment-modal card">
                <div className="payment-header">
                  <h3>Payment Options</h3>
                  <button 
                    className="close-button"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="payment-content">
                  <div className="payment-amount">
                    <p className="payment-label">Amount to pay</p>
                    <p className="payment-value">2,00,010</p>
                  </div>

                  <div className="payment-methods">
                    <label className="payment-option">
                      <input type="radio" name="payment-method" defaultChecked />
                      <span>Bank Transfer</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="payment-method" />
                      <span>Credit Card</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="payment-method" />
                      <span>Cheque</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="payment-method" />
                      <span>UPI</span>
                    </label>
                  </div>

                  <div className="payment-reference">
                    <label>
                      Payment Reference / Txn ID
                      <input type="text" placeholder="Enter transaction ID or reference number" />
                    </label>
                  </div>

                  <div className="payment-actions">
                    <button 
                      className="primary-button" 
                      type="button"
                      onClick={() => {
                        setShowPaymentModal(false)
                      }}
                    >
                      Confirm Payment
                    </button>
                    <button 
                      className="secondary-button" 
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) : activePage === 'reports' ? (
          <section className="reports-page">
            <div className="reports-header">
              <div>
                <p className="reports-title">Reports & analytics</p>
                <h2>Procurement Insights - May 2025</h2>
              </div>
              <div className="reports-actions">
                <button className="secondary-button" type="button">May 2025</button>
                <button className="secondary-button" type="button">Export</button>
              </div>
            </div>

            <div className="reports-highlights">
              <div className="report-stat-card">
                <span>12.4L</span>
                <p>Total spend</p>
              </div>
              <div className="report-stat-card">
                <span>28</span>
                <p>Active vendors</p>
              </div>
              <div className="report-stat-card">
                <span>94%</span>
                <p>PO fulfillment</p>
              </div>
              <div className="report-stat-card">
                <span>3</span>
                <p>Overdue invoices</p>
              </div>
            </div>

            <div className="reports-board card">
              <div className="reports-left">
                <div className="reports-card">
                  <div className="card-header">
                    <h3>Spend by category</h3>
                  </div>
                  <div className="category-row">
                    <span>IT Hardware</span>
                    <strong>₹4.8L</strong>
                  </div>
                  <div className="category-bar blue"><div /></div>
                  <div className="category-row">
                    <span>Furniture</span>
                    <strong>₹3.2L</strong>
                  </div>
                  <div className="category-bar green"><div /></div>
                  <div className="category-row">
                    <span>Stationery</span>
                    <strong>₹2.1L</strong>
                  </div>
                  <div className="category-bar teal"><div /></div>
                  <div className="category-row">
                    <span>Logistics</span>
                    <strong>₹2.3L</strong>
                  </div>
                  <div className="category-bar orange"><div /></div>
                </div>
              </div>

              <div className="reports-right">
                <div className="reports-card top-vendors-card">
                  <div className="card-header">
                    <h3>Top vendors by spend</h3>
                  </div>
                  <table className="top-vendors-table">
                    <thead>
                      <tr>
                        <th>Vendor</th>
                        <th>Spend (₹)</th>
                        <th>POs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>TechCore Ltd</td>
                        <td>1,90,000</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>Infra Supplies</td>
                        <td>1,20,000</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>FastLog</td>
                        <td>92,000</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="reports-card monthly-trend-card">
                  <div className="card-header">
                    <h3>Monthly trend</h3>
                  </div>
                  <div className="trend-chart">
                    <div className="trend-bar"><span>Dec</span></div>
                    <div className="trend-bar"><span>Jan</span></div>
                    <div className="trend-bar"><span>Feb</span></div>
                    <div className="trend-bar"><span>Mar</span></div>
                    <div className="trend-bar active"><span>May</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : activePage === 'activity' ? (
          <section className="activity-page">
            <div className="activity-header">
              <div>
                <p className="activity-title">Activity & Logs</p>
                <h2>Procurement audit trail</h2>
              </div>
            </div>

            <div className="activity-filters card">
              <button className="activity-filter active" type="button">All</button>
              <button className="activity-filter" type="button">RFQ</button>
              <button className="activity-filter" type="button">Approvals</button>
              <button className="activity-filter" type="button">Invoices</button>
              <button className="activity-filter" type="button">Vendors</button>
            </div>

            <div className="activity-list">
              <div className="activity-item card">
                <div className="activity-icon completed">✓</div>
                <div>
                  <p><strong>Quotation selected</strong> - Infra supplies pvt ltd selected for office furniture q2</p>
                  <span>23 may 2025, 9:15 PM</span>
                </div>
              </div>
              <div className="activity-item card">
                <div className="activity-icon pending">⏳</div>
                <div>
                  <p><strong>Approval pending</strong> - PO-2024 awaiting L2 approval by priya</p>
                  <span>22 may 2025, 09:15 AM</span>
                </div>
              </div>
              <div className="activity-item card">
                <div className="activity-icon info">i</div>
                <div>
                  <p><strong>RFQ published</strong> - office furniture Q2 sent to 3 vendors</p>
                  <span>19 may 2025</span>
                </div>
              </div>
              <div className="activity-item card">
                <div className="activity-icon vendor">V</div>
                <div>
                  <p><strong>Vendor added</strong> - Fastlog transport registered and pending verifications</p>
                  <span>18 may 2025, 3:20 PM</span>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="dashboard-placeholder card">
            <h2>{navItems.find((item) => item.id === activePage)?.label}</h2>
            <p>Page content coming soon.</p>
          </section>
        )}
      </div>
    </main>
  )
}

export default Dashboard
