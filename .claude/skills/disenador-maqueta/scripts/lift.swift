import Vision
import CoreImage
import AppKit
let args = CommandLine.arguments
let url = URL(fileURLWithPath: args[1])
let ci = CIImage(contentsOf: url)!
let req = VNGenerateForegroundInstanceMaskRequest()
let h = VNImageRequestHandler(ciImage: ci)
try h.perform([req])
guard let r = req.results?.first else { print("no subject"); exit(1) }
print("instances", r.allInstances.count)
let idx = args.count > 3 ? IndexSet(integer: Int(args[3])!) : r.allInstances
let buf = try r.generateMaskedImage(ofInstances: idx, from: h, croppedToInstancesExtent: false)
let out = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
try ctx.writePNGRepresentation(of: out, to: URL(fileURLWithPath: args[2]), format: .RGBA8, colorSpace: CGColorSpaceCreateDeviceRGB())
print("ok")
