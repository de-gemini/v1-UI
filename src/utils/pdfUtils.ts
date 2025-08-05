import jsPDF from 'jspdf';

export interface PDFSchedule {
  _id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startDate: string;
  time: string;
  paymentStatus?: string; // Payment status from Schedule document
  booking: {
    _id: string;
    user?: {
      name?: string;
      email?: string;
    };
    address?: string;
    estimatedPrice?: number;
    estimatedDuration?: number;
  };
}

export interface PDFBooking {
  _id: string;
  user?: {
    name?: string;
    email?: string;
  };
  scheduledDate: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'; // Make optional
  address?: string;
  estimatedPrice?: number;
  estimatedDuration?: number;
  paymentStatus?: string;
}

export class PDFUtils {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
  }

  /**
   * Add decorative background similar to DecorativeBackground component
   */
  addDecorativeBackground(): void {
    // Large circles (similar to the SVG circles) - using very light colors for faded effect
    this.doc.setFillColor(240, 245, 255); // Very light blue
    this.doc.circle(30, 60, 25, 'F');
    this.doc.circle(180, 80, 30, 'F');
    this.doc.circle(50, 250, 20, 'F');
    this.doc.circle(160, 200, 15, 'F');
    
    // Purple circles
    this.doc.setFillColor(245, 243, 255); // Very light purple
    this.doc.circle(200, 50, 18, 'F');
    this.doc.circle(40, 180, 22, 'F');
    
    // Cyan circles
    this.doc.setFillColor(240, 253, 255); // Very light cyan
    this.doc.circle(170, 120, 12, 'F');
    this.doc.circle(80, 90, 16, 'F');
    
    // Orange circles
    this.doc.setFillColor(255, 251, 240); // Very light orange
    this.doc.circle(120, 40, 14, 'F');
    this.doc.circle(60, 220, 19, 'F');
    
    // Green rectangles (similar to the SVG rectangles)
    this.doc.setFillColor(240, 253, 244); // Very light green
    this.doc.roundedRect(25, 150, 20, 20, 10, 10, 'F');
    this.doc.roundedRect(150, 30, 15, 15, 7.5, 7.5, 'F');
    
    // Pink rectangles
    this.doc.setFillColor(253, 242, 248); // Very light pink
    this.doc.roundedRect(180, 160, 18, 18, 9, 9, 'F');
    this.doc.roundedRect(70, 70, 12, 12, 6, 6, 'F');
  }

  /**
   * Add blue header background with title and subtitle
   */
  addHeader(title: string, subtitle?: string): void {
    // Add blue header background
    this.doc.setFillColor(37, 99, 235); // Blue-600 color
    this.doc.rect(0, 0, this.doc.internal.pageSize.width, 40, 'F');
    
    // Set title in white on blue background
    this.doc.setTextColor(255, 255, 255); // White text
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, 20, 25);
    
    // Set subtitle in white if provided
    if (subtitle) {
      this.doc.setFontSize(14);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, 20, 35);
    }
    
    // Reset text color to black for content
    this.doc.setTextColor(0, 0, 0);
  }

  /**
   * Add status with colored background
   */
  addStatusWithColor(status: string, x: number, y: number): number {
    this.doc.text('Status: ', x, y);
    
    // Set status color based on status
    if (status === 'completed') {
      this.doc.setTextColor(34, 197, 94); // Green
      this.doc.setFillColor(240, 253, 244); // Light green background
    } else if (status === 'confirmed') {
      this.doc.setTextColor(59, 130, 246); // Blue
      this.doc.setFillColor(239, 246, 255); // Light blue background
    } else if (status === 'pending') {
      this.doc.setTextColor(234, 179, 8); // Yellow
      this.doc.setFillColor(254, 249, 195); // Light yellow background
    } else if (status === 'cancelled') {
      this.doc.setTextColor(239, 68, 68); // Red
      this.doc.setFillColor(254, 242, 242); // Light red background
    }
    
    // Draw faded background rectangle
    this.doc.rect(x + 25, y - 4, 30, 5, 'F');
    this.doc.text(status, x + 30, y);
    
    // Reset text color
    this.doc.setTextColor(0, 0, 0);
    return y + 10;
  }

  /**
   * Add payment status with colored background
   */
  addPaymentStatusWithColor(paymentStatus: string, x: number, y: number): number {
    this.doc.text('Payment Status: ', x, y);
    
    // Capitalize first letter of payment status
    const capitalizedPaymentStatus = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);
    
    // Set payment status color and background
    if (paymentStatus === 'completed') {
      this.doc.setTextColor(34, 197, 94); // Green
      this.doc.setFillColor(240, 253, 244); // Light green background
    } else if (paymentStatus === 'pending') {
      this.doc.setTextColor(234, 179, 8); // Yellow
      this.doc.setFillColor(254, 249, 195); // Light yellow background
    } else if (paymentStatus === 'failed') {
      this.doc.setTextColor(239, 68, 68); // Red
      this.doc.setFillColor(254, 242, 242); // Light red background
    } else {
      this.doc.setTextColor(107, 114, 128); // Gray
      this.doc.setFillColor(249, 250, 251); // Light gray background
    }
    
    // Draw faded background rectangle for payment status
    this.doc.rect(x + 25, y - 4, 30, 5, 'F');
    this.doc.text(capitalizedPaymentStatus, x + 30, y);
    
    // Reset text color
    this.doc.setTextColor(0, 0, 0);
    return y + 15;
  }

  /**
   * Add text with proper wrapping
   */
  addWrappedText(label: string, text: string, x: number, y: number, maxWidth: number = 150): number {
    this.doc.text(`${label}: `, x, y);
    const textLines = this.doc.splitTextToSize(text, maxWidth);
    this.doc.text(textLines, x + 30, y);
    return y + (textLines.length * 6);
  }

  /**
   * Add timestamp at bottom of page
   */
  addTimestamp(): void {
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setTextColor(107, 114, 128); // Gray color
    this.doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, this.doc.internal.pageSize.height - 20);
  }

  /**
   * Add new page with decorative background
   */
  addNewPage(): number {
    this.doc.addPage();
    this.addDecorativeBackground();
    return 20; // Return starting Y position
  }

  /**
   * Save the PDF
   */
  save(filename: string): void {
    this.doc.save(filename);
  }

  /**
   * Get the jsPDF document instance
   */
  getDocument(): jsPDF {
    return this.doc;
  }

  /**
   * Check if we need a new page and add one if necessary
   */
  checkAndAddPage(currentY: number, requiredSpace: number = 80): number {
    if (currentY > this.doc.internal.pageSize.height - requiredSpace) {
      return this.addNewPage();
    }
    return currentY;
  }
}

/**
 * Create a schedule management PDF
 */
export const createScheduleManagementPDF = (
  schedules: PDFSchedule[],
  filters: { month: number; year: number; status: string },
  viewMode: string,
  paymentStatusFilter: string,
  searchTerm: string
): void => {
  const pdf = new PDFUtils();
  
  // Add decorative background and header
  pdf.addDecorativeBackground();
  pdf.addHeader(
    'Schedule Management Report',
    `${filters.month}/${filters.year} - ${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View`
  );
  
  // Add filter info
  pdf.getDocument().setFontSize(12);
  pdf.getDocument().setFont('helvetica', 'normal');
  pdf.getDocument().text(`Total schedules: ${schedules.length}`, 20, 50);
  
  if (filters.status) {
    pdf.getDocument().text(`Status filter: ${filters.status}`, 20, 60);
  }
  if (paymentStatusFilter !== 'all') {
    pdf.getDocument().text(`Payment filter: ${paymentStatusFilter}`, 20, 70);
  }
  if (searchTerm) {
    pdf.getDocument().text(`Search term: "${searchTerm}"`, 20, 80);
  }
  
  let yPosition = 100;
  
  // Add each schedule
  schedules.forEach((schedule, index) => {
    yPosition = pdf.checkAndAddPage(yPosition, 80);
    
    // Schedule header with date
    pdf.getDocument().setFontSize(14);
    pdf.getDocument().setFont('helvetica', 'bold');
    pdf.getDocument().text(`Schedule ${index + 1} - ${new Date(schedule.startDate).toLocaleDateString()}`, 20, yPosition);
    
    // Schedule details
    pdf.getDocument().setFontSize(10);
    pdf.getDocument().setFont('helvetica', 'normal');
    yPosition += 10;
    
    pdf.getDocument().text(`Service: Standard Cleaning`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Customer: ${schedule.booking.user?.name || 'Unknown'}`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Email: ${schedule.booking.user?.email || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Time: ${schedule.time}`, 20, yPosition);
    yPosition += 6;
    
    // Address with proper wrapping
    yPosition = pdf.addWrappedText('Address', schedule.booking.address || 'N/A', 20, yPosition);
    
    pdf.getDocument().text(`Price: £${schedule.booking.estimatedPrice || 0}`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Duration: ${schedule.booking.estimatedDuration || 0} min`, 20, yPosition);
    yPosition += 6;
    
    // Status with color
    yPosition = pdf.addStatusWithColor(schedule.status, 20, yPosition);
    
         // Payment status
     yPosition = pdf.addPaymentStatusWithColor(schedule.paymentStatus || 'N/A', 20, yPosition);
    
    // Add separator line
    if (index < schedules.length - 1) {
      pdf.getDocument().setDrawColor(229, 231, 235); // Gray color
      pdf.getDocument().line(20, yPosition, 190, yPosition);
      yPosition += 10;
    }
  });
  
  // Add timestamp
  pdf.addTimestamp();
  
  // Save the PDF
  pdf.save(`schedule-management-${filters.month}-${filters.year}-${viewMode}.pdf`);
};

/**
 * Create a bookings PDF
 */
export const createBookingsPDF = (
  bookings: PDFBooking[],
  activeFilter: string
): void => {
  const pdf = new PDFUtils();
  
  // Add decorative background and header
  pdf.addDecorativeBackground();
  pdf.addHeader(
    'My Cleaning Appointments',
    `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Bookings`
  );
  
  // Add filter info
  pdf.getDocument().setFontSize(12);
  pdf.getDocument().setFont('helvetica', 'normal');
  pdf.getDocument().text(`Total ${activeFilter} bookings: ${bookings.length}`, 20, 50);
  
  let yPosition = 70;
  
  // Add each booking
  bookings.forEach((booking, index) => {
    yPosition = pdf.checkAndAddPage(yPosition, 80);
    
    // Booking header
    pdf.getDocument().setFontSize(14);
    pdf.getDocument().setFont('helvetica', 'bold');
    pdf.getDocument().text(`Booking ${index + 1}`, 20, yPosition);
    
    // Booking details
    pdf.getDocument().setFontSize(10);
    pdf.getDocument().setFont('helvetica', 'normal');
    yPosition += 10;
    
    pdf.getDocument().text(`Service: Standard Cleaning`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Customer: ${booking.user?.name || 'Unknown Customer'}`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Email: ${booking.user?.email || 'No email'}`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Date: ${new Date(booking.scheduledDate).toLocaleDateString()}`, 20, yPosition);
    yPosition += 6;
    
    yPosition = pdf.addWrappedText('Address', booking.address || 'No address', 20, yPosition);
    
    pdf.getDocument().text(`Price: £${booking.estimatedPrice || 0}`, 20, yPosition);
    yPosition += 6;
    
    pdf.getDocument().text(`Duration: ${booking.estimatedDuration || 0} min`, 20, yPosition);
    yPosition += 6;
    
    // Status with color - provide fallback
    yPosition = pdf.addStatusWithColor(booking.status || 'pending', 20, yPosition);
    
    // Payment status - provide fallback
    yPosition = pdf.addPaymentStatusWithColor(booking.paymentStatus || 'N/A', 20, yPosition);
    
    // Add separator line
    if (index < bookings.length - 1) {
      pdf.getDocument().setDrawColor(229, 231, 235); // Gray color
      pdf.getDocument().line(20, yPosition, 190, yPosition);
      yPosition += 10;
    }
  });
  
  // Add timestamp
  pdf.addTimestamp();
  
  // Save the PDF
  pdf.save(`my-bookings-${activeFilter}-${new Date().toISOString().split('T')[0]}.pdf`);
}; 